import React, {Component} from 'react';

import theme from '../css/quill.snow.css'


console.log(theme);
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
        <div>
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
          <Quill theme="snow"/>
        </div>
      )
    } else {
      return null;
    }
  }
}
export default QuillWrap;
