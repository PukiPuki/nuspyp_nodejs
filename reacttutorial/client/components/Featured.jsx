import React from 'react';

class Featured extends React.Component {
  render() {
    return (
      <div>
        <h1>featured portion</h1>
          {this.props.children}
        <h1>end of featured portion</h1>
      </div>
    )
  }
}

export { Featured };
