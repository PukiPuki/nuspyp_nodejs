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

// components
import ThreadItem from '../components/ThreadItem';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

class CreateComment extends Component {
  constructor(props) {
    super(props)
    this.state = {open: false};
  }

  state = {open: false};

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleQuestionNumber(e) {
    this.setState({questionNumber: e.target.value});
  }

  handleBody(e) {
    this.setState({body: e.target.value});
  }

  handleWeirdName(e) {
    this.setState({title: e.target.value});
  }

  handleSubmit() {
    const { postThread, params } = this.props;
    const ModuleCode = params.moduleCode;
    const Year = Number.parseInt(params.yearSem.substring(0,4));
    const Sem = Number.parseInt(params.yearSem.substring(4,5));
    const Thread = {
      Title: this.state.title,
      Body: this.state.body,
      QuestionNumber: this.state.questionNumber,
      Author: "Holy Jesus Burger",
      Votes: 99,
      Comments: [],
      ModuleCode,
      Year,
      Sem,
    }
    postThread(Thread);
  }
  
  render() {
    const { threads, router, routeParams } = this.props;
    console.log(this.props);
    console.log("threads");
    console.log(threads);
    const actions = [
      <RaisedButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleToggle.bind(this)}
      />,
    ]
    return (
      <div>
        <Dialog
          title="Create A Thread"
          modal={true}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleToggle.bind(this)} >
          <TextField hintText="Question Number" onChange={this.handleQuestionNumber.bind(this)} fullWidth={true} />
          <TextField hintText="Title" onChange={this.handleWeirdName.bind(this)} fullWidth={true} />
          <TextField hintText="Body" onChange={this.handleBody.bind(this)} fullWidth={true} />
        </Dialog>

        <Toolbar>
          <ToolbarGroup>
            <RaisedButton label="Create Thread" primary={true} onTouchTap={this.handleToggle.bind(this)} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

class Head extends Component {
  constructor() {
    super()
  }

  render() {
    const { thread } = this.props;
    console.log(thread);
    console.log(thread.Title);
    return(
      <div>
        <CreateComment />
        <Card>
          <CardTitle title={thread.Title} subtitle={thread.Author} />
          <CardText>
            {thread.Body}
          </CardText> 
          <CardActions>
            <FlatButton label="Comment" />
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
    this.state = {open: false};
  }

  render() {
    const { threads } = this.props;
    console.log(threads)
    const { threadId } = this.props.params;
    console.log(threadId)
    const thread = threads.filter((thread) => {
      return thread._id == threadId
    })[0]
    console.log("threads")
    console.log(threads)
    console.log(thread)

    return (
      <div>
        <h1> welcome to questions </h1>
        <Head thread={thread} />
      </div>
    )
  }

};

function mapStateToProps(state) {
  return {
    threads: state.module.threads,
  }
}

export default connect(mapStateToProps, { postThread })(Question);
