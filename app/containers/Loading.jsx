import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

class Loading extends Component{

  render() {
    const  { component, loading } = this.props;
    
    const prog = (loading) => {
      if(loading) {
        return (<CircularProgress size={80} thickness={5} />)
      } else {
        return component;
      }
    }

    return (
      <div>
        {prog(loading)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(Loading);
