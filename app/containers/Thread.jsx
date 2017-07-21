import React, { Component } from 'react';
import { connect } from 'react-redux';

// Mateiral uI
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


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

  handleToggle() {
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

  handleSubmit() {
    console.log(this.state);
  }
  
  render() {
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
          <TextField hintText="Title" onChange={this.handleTitle.bind(this)} fullWidth={true} />
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
};

function mapStateToProps() {
  return {
  }
}

export default Thread;
