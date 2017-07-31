import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { browserHistory, Link, Router } from 'react-router';

// Material-ui
import MenuItem from 'material-ui/MenuItem';
import { Card, CardHeader } from 'material-ui/Card';

// action
import { goToThread } from '../actions/modules';
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

class YearCard extends Component {
  title() {
    const { year, sem } = this.props
    const yearSem = `AY ${year} SEM ${sem}`;
    return yearSem
  }

  card() {
    return (
      <Card> 
        <CardHeader title={this.title()} />
      </Card>
    )
  }

  handleTouch() { 
    const { goToThread, moduleCode, sem, year } = this.props;
    const here = `/modules/${moduleCode}/${year}${sem}`;
    goToThread(here);
  }

  menu() {
    return (
      <div>
        <MenuItem primaryText={this.title()} onTouchTap={this.handleTouch.bind(this)} />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.menu()}
      </div>
    )
  }
}



class Module extends Component {
  
	render() {
		console.log('BEFORE ERR');
    console.log(this.props)
    const { papers, goToThread } = this.props;
    const moduleCode = papers[0].ModuleCode
    const paperList = papers[0].Papers.map((paper, key) => {
      return (
          <YearCard year={paper.Year} sem={paper.Sem} moduleCode={moduleCode} key={key} goToThread={goToThread} />
      )
    })

    return (
      <div>
        <h1> {moduleCode} Past Year Papers </h1>
        {paperList}
      </div>
	  )
  } 
};

function mapStateToProps(state) {
  return {
    papers: state.module.papers,
  }
}

export default connect(mapStateToProps, { goToThread })(Module);
