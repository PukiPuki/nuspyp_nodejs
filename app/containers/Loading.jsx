import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

class Loading extends Component{

  render() {
    const  { component, loading } = this.props;

    const style = {
      marginTop: 100,
      textAlign: 'center',
    }
    
    const prog = (loading) => {
      if(loading) {
        return (
          <div style={style}>
            <CircularProgress size={180} thickness={15} />
          </div>
        )
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
