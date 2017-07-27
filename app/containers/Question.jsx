import React, { Component } from 'react';
import { connect } from 'react-redux';

// Mateiral uI
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// actions
import { postThread }  from '../actions/modules';
import { postCommentToThread, getArrayOfComments } from '../actions/modules';

// components
import ThreadItem from '../components/ThreadItem';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

class Tail extends Component {
  constructor(props) {
    super(props)
  }

  handleCommentButton() {
    const { handleToggle, comment } = this.props;
    handleToggle({
      type: "comment",
      Replyto: comment.Author,
      ReplyToId: comment._id,
    });
  }

  render() {
    const { ReplyTo, Author, Body } = this.props.comment;
    return (
      <div>
        <Card>
          <CardText>
            {Body}
          </CardText>
          <CardTitle subtitle={ReplyTo} />
          <CardActions>
            <FlatButton label="Comment" onTouchTap={this.handleCommentButton.bind(this)}/>
            <FlatButton label="Like" />
          </CardActions>
        </Card>
      </div>
    )
  }
}

class Head extends Component {
  constructor() {
    super()
  }
  
  handleCommentButton() {
    const { thread, handleToggle } = this.props
    console.log("handle comment button");
    handleToggle({
      type: "thread",
      ReplyTo: thread.Author,
      ReplyToId: thread._id,
    });
  }

  render() {
    const { thread } = this.props;
    return(
      <div>
        <Card>
          <CardTitle title={thread.Title} subtitle={thread.Author} />
          <CardText>
            {thread.Body}
          </CardText> 
          <CardActions>
            <FlatButton label="Comment" onTouchTap={this.handleCommentButton.bind(this)}/>
            <FlatButton label="Like" />
          </CardActions>
        </Card>
      </div>
    )
  }
}

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      id: "default",
      createComment: {
        comment: {
          Body: null,
        }
      }
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleId() {
  }

  handleSubmit() {
    const { postCommentToThread } = this.props;
    const { createComment } = this.state;
    switch (createComment.type) {
      case "thread":
        postCommentToThread(createComment.comment);
        break;
      default:
        console.log("no thread");
    }
  }

  handleToggle({ type, ReplyTo, ReplyToId }) {
    this.setState({
      open: !this.state.open,
      createComment: {
        type,
        comment: {
          ReplyTo,
          ReplyToId,
          Author: "some commenter",
          Votes: 99,
          Comments: [],
        }
      }
    });
  }

  handleBody(e) {
    this.state.createComment.comment.Body = e.target.value;
  }

  handleCommentButton(e) {
  
  }

  componentWillMount() {
    // to generate the first head.
    const { threads, getArrayOfComments, comments } = this.props;
    const { threadId } = this.props.params;
    const thread = threads.filter((thread) => {
      return thread._id == threadId
    })[0]
    const { Comments } = thread;
    getArrayOfComments(Comments);
  }

  render() {
    const { threads, comments } = this.props;
    const { threadId } = this.props.params;
    const thread = threads.filter((thread) => {
      return thread._id == threadId
    })[0]

    const explodeComments = comments.map((comment, key) => {
      return (
        <Tail comment={comment} handleToggle={this.handleToggle.bind(this)}/>
      )
    })

    const actions = [
      <RaisedButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleToggle}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Reply to Comment!"
          modal={true}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleToggle.bind(this)} >
          <TextField hintText="Id" onChange={this.handleId.bind(this)} value={this.state.createComment.comment.ReplyToId} fullWidth={true} />
          <TextField hintText="Body" onChange={this.handleBody.bind(this)} fullWidth={true} />
        </Dialog>
        <h1> welcome to questions </h1>
        <Head thread={thread} handleToggle={this.handleToggle.bind(this)}/>
        {explodeComments}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    threads: state.module.threads,
    comments: state.module.comments,
  }
}

export default connect(mapStateToProps, { postThread, postCommentToThread, getArrayOfComments })(Question);
