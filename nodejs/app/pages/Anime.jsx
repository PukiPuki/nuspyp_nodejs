import React, { Component } from 'react';
import Page from '../pages/Page';
import AnimeContainer from '../containers/Anime/Anime2';

class Anime extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Anime';
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
        <AnimeContainer {...this.props} />
      </Page>
    );
  }
}

export default Anime;
