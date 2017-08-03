import React, {Component} from 'react';

import theme from '../css/quill.snow.css'


class QuillWrap extends Component {
  constructor(props) {
    super(props)
    if (document) {
      this.quill = require('react-quill');
    }
  }

  render() {
    const Quill = this.quill;
		const toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [ 'link', 'image', 'video', 'formula' ],          // add's image support
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ];
    if(Quill) {
      return (
        <div>
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
          <Quill theme="snow" modules={ {toolbar: toolbarOptions}}/>
        </div>
      )
    } else {
      return null;
    }
  }
}
export default QuillWrap;
