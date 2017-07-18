import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Card, CardHeader } from 'material-ui/Card';
import { getModuleYearsSemsRequest } from '../actions/modules';
import { connect } from 'react-redux';
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

class YearCard extends Component {
  render() {
    return (
      <div>
        <Card> 
          <CardHeader title={this.props.year} />
        </Card>
      </div>
    )
  }
}


class Module extends Component {
  componentWillMount() { 
    this.props.getModuleYearsSemsRequest(this.props.params.id);
  }

  render() {
    const { yearssems } = this.props;
    const pull = yearssems.map((year, key) => {
      return (
        <YearCard year={year} key={key} />
      )
    })

    return (
      <div>
        <h1> { yearssems }</h1>
        {pull}
      </div>
	  )
  } 
};

function mapStateToProps(state) {
  return {
    yearssems: state.module.modulefs,
  }
}

export default connect(mapStateToProps, { getModuleYearsSemsRequest })(Module);
