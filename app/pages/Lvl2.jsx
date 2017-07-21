import React, { Component } from 'react';
import Page from '../pages/Page';
import AboutContainer from '../containers/About';

class Lvl2 extends Component {
  render() {
    console.log("I am being rendered");
    return (
      <div>
        <h1> lvl2 </h1>
        {this.props.children}
      </div>
    );
  }
}

export default Lvl2;
