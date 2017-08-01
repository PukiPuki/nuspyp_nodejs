import React, { Component } from 'react';
import Page from '../pages/Page';
import ThreadListContainer from '../containers/threads/ThreadList';

class ThreadList extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'About | reactGo';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'A reactGo example of life' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ThreadListContainer {...this.props} />
      </Page>
    );
  }
}

export default ThreadList;
