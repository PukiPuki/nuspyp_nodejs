import React, {Component} from 'react';

class QuillWrap extends Component {
  constructor(props) {
    super(props)
    if (document) {
      this.quill = require('react-quill');
    }
  }

  render() {
    const Quill = this.quill
    if(Quill) {
      return (
        <Quill />
      )
    } else {
      return null;
    }
  }
}
export default QuillWrap;
