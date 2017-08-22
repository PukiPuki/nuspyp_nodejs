import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { flip } from '../../actions/modules';

class Comment extends Component {
  constructor(props) {
    super(props)
    console.log(this.props);
    this.state = {
      Votes: {
        up: [],
        down: [],
      },
    }
  }

  handleCommentButton = () => {
    const { handleToggle, comment, threadId, user } = this.props;
    handleToggle({
      type: "comment",
      threadId,
      ReplyTo: comment.Author,
      ReplyToId: comment._id,
      AuthorId: user.session._id,
    });
  }

  handleEdit = () => {
    const { handleToggle, comment, threadId, user } = this.props;
    handleToggle({
      threadId,
      type: "updateComment",
      commentId: comment._id,
      Body: comment.Body,
      AuthorId: user.session._id,
    });
  }

  handleUp = () => {
    const flip = this.props.flip
    const id = this.props.user.session._id
    const funcUp = ({up, down}, id) => {
      const upIdx = up.findIndex((e)=>(e==id))
      const downIdx = down.findIndex((e)=>(e==id))
      if(downIdx !== -1) {
        down.splice(downIdx, 1)
      } else if (upIdx == -1) {
        up.push(id)
      } else {
        flip("you already up voted")
      }
    }
    funcUp(this.state.Votes, id)
    this.setState({Votes: this.state.Votes})
  }

  handleDown = () => {
    const flip = this.props.flip
    const id = this.props.user.session._id
    const funcDown = ({up, down}, id) => {
      const upIdx = up.findIndex((e)=>(e==id))
      const downIdx = down.findIndex((e)=>(e==id))
      if(upIdx !== -1) {
        up.splice(upIdx, 1)
      } else if (downIdx == -1) {
        down.push(id)
      } else {
        flip("you already down voted")
      }
    }
    funcDown(this.state.Votes, id)
    console.log(this.state.Votes)
    this.setState({Votes: this.state.Votes})
  }

  render() {
    const { ReplyTo, Author, Body, DateCreated, AuthorId } = this.props.comment;
    const { user } = this.props;
    const { style } = this.props;

    const nameAndDate = ({Author, DateCreated}) => {
      return (
        <div>
          {Author}<br/>
          {DateCreated}
        </div>
      )
    }

    const allowEdit = () => {
      if(user.authenticated && (user.session._id==AuthorId)) {
        return (
          <FlatButton label="Edit" onTouchTap={this.handleEdit} />
        )
      }
    }

    const allowComment = () => {
      if(user.authenticated) {
        return (
          <div>
            <FlatButton label="Comment" onTouchTap={this.handleCommentButton}/>
            <FlatButton label="Like" />
            <FlatButton label="Up" onTouchTap={this.handleUp}/>
            <FlatButton label="Down" onTouchTap={this.handleDown}/>
          </div>
        )
      } else {
        return (
          <div>
            <FlatButton label="Comment" onTouchTap={this.props.handleOopsToggle}/>
            <FlatButton label="Like" onTouchTap={this.props.handleOopsToggle}/>
            <FlatButton label="Up" onTouchTap={this.props.handleOopsToggle}/>
            <FlatButton label="Down" onTouchTap={this.props.handleOopsToggle}/>
          </div>
        )
      }
    }


    return (
      <div style={style}>
        <Card>
          <CardText>
            <div dangerouslySetInnerHTML={{__html: Body }} />
          </CardText>
          <CardTitle subtitle={nameAndDate({Author, DateCreated})} />
          <CardActions>
            {allowComment()}
            {allowEdit()}
            <div>
              {this.state.Votes.up.length-this.state.Votes.down.length}number  
            </div>
          </CardActions>
        </Card>

        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, { flip })(Comment);
