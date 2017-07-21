import React, { Component } from 'react';
import Page from '../pages/Page';
import AboutContainer from '../containers/About';
import { connect } from 'react-redux';

class Lvl1 extends Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    console.log("lvl1 this.props");
    console.log(this.props);
    const { bugYui } = this.props;  
    bugYui();
    return (
      <div>
        <h1> lvl1 </h1>
      </div>
    );
  }
}

import { push } from 'react-router-redux';
import * as types from '../types';
function bugYui(stick) {
  return (dispatch) => {
    console.log("dispatch");
    console.log(dispatch);
    dispatch(push('modules/ACC1002'))
  }
}

function mapStateToProps(state) {
  return { }
} 


export default connect( mapStateToProps, { bugYui })(Lvl1);
