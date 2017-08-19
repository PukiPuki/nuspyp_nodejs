import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class Comment extends Component {
  constructor(props) {
    super(props)
    console.log(this.props);
  }

  handleCommentButton = () => {
    const { handleToggle, comment, threadId } = this.props;
    handleToggle({
      type: "comment",
      threadId,
      ReplyTo: comment.Author,
      ReplyToId: comment._id,
    });
  }

  handleEdit = () => {
    const { handleToggle, comment, threadId } = this.props;
    handleToggle({
      threadId,
      type: "updateComment",
      commentId: comment._id,
      Body: comment.Body,
    });
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

    const allowComment = () => {
      if(user.authenticated) {
        return (
          <div>
            <FlatButton label="Comment" onTouchTap={this.handleCommentButton}/>
            <FlatButton label="Like" />
          </div>
        )
      } else {
        return (
          <div>
            <FlatButton label="Comment" onTouchTap={this.props.handleOopsToggle}/>
            <FlatButton label="Like" onTouchTap={this.props.handleOopsToggle}/>
          </div>
        )
      }
    }

    const allowEdit = () => {
      if(user.authenticated && user.session._id==AuthorId) {
        return (
          <FlatButton label="Edit" onTouchTap={this.handleEdit} />
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

export default connect(mapStateToProps)(Comment);
