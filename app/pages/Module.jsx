import React, { Component } from 'react';
import Page from '../pages/Page';
import ModuleContainer from '../containers/Module';
import { connect } from 'react-redux';

class Module extends Component {
  getMetaData(modCode) {
    return {
      title: this.pageTitle(modCode),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = (title) => {
    return title;
  };

  pageMeta = () => {
    return [
      { name: 'Description', content: 'Page for module' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    const { routing } = this.props;
    console.log("Routing");
    // let modCode = routing.locationBeforeTransitions.pathname;
    // modCode = modCode.slice(9);
    const modCode = "SEX1002";
    return (
      <Page {...this.getMetaData(modCode)}>
        <ModuleContainer {...this.props} />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing
  }
}

export default connect(mapStateToProps)(Module);

