import React, { Component } from 'react';
import Page from '../pages/Page';
import ModuleContainer from '../containers/Module';

class Module extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Module | reactGo';
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
        <ModuleContainer {...this.props} />
      </Page>
    );
  }
}

export default Module;
