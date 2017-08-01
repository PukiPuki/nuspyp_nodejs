import React, { Component } from 'react';
import { connect } from 'react-redux';

// Mateiral uI
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

// actions
import { postThread }  from '../../actions/modules';

// components
import ThreadItem from './ThreadItem';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
class Thread extends Component {

  constructor(props) {
    super(props)
    this.state = {open: false};
  }

  state = {open: false};

  handleToggle =() => {
    this.setState({open: !this.state.open});
  }

  handleQuestionNumber(e) {
    this.setState({questionNumber: e.target.value});
  }

  handleBody(e) {
    this.setState({body: e.target.value});
  }

  handleTitle(e) {
    this.setState({title: e.target.value});
  }

  handleSubmit = () => {
    const { postThread, params } = this.props;
    const ModuleCode = params.moduleCode;
    const Year = Number.parseInt(params.yearSem.substring(0,4));
    const Sem = Number.parseInt(params.yearSem.substring(4,5));
    const Thread = {
      Title: this.state.title,
      Body: this.state.body,
      QuestionNumber: this.state.questionNumber,
      Author: "E0031263",
      Votes: 99,
      Comments: [],
      ModuleCode,
      Year,
      Sem,
    }
    postThread(Thread);
		return this.handleToggle();
  }

  render() {
    const { threads, router, routeParams } = this.props;
    const threadItems = threads.map((thread, onKeyDown) => {
      return (
        <ThreadItem thread={thread} router={router} routeParams={routeParams} />
      )
    })
    const actions = [
      <RaisedButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit}
				onRequestClose={this.handleToggle}
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
          title="Create A Thread"
          modal={true}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleToggle} >
          <TextField hintText="Question Number" onChange={this.handleQuestionNumber.bind(this)} fullWidth={true} />
          <TextField hintText="Title" onChange={this.handleTitle.bind(this)} fullWidth={true} />
          <TextField hintText="Body" onChange={this.handleBody.bind(this)} fullWidth={true} />
        </Dialog>

        <Toolbar>
          <ToolbarGroup>
            <RaisedButton label="Create Thread" primary={true} onTouchTap={this.handleToggle} />
          </ToolbarGroup>
        </Toolbar>
        {threadItems}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    threads: state.module.threads,
  }
}

export default connect(mapStateToProps, { postThread })(Thread);
