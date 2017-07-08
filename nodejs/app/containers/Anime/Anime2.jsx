import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import classNames from 'classnames/bind';
import EntryBox from '../components/Anime/AnimeBox';
import MainSection from '../components/Anime/Anime';
import Scoreboard from '../components/Scoreboard';
import { createAnime, typing, destroyAnime } from '../actions/animes';
import styles from '../css/components/vote';

const cx = classNames.bind(styles);

class AnimeList extends Component {
  render() {
    const {newAnime, animes, typing, createAnime, destroyAnime } = this.props;
    return (
      <div>
        <EntryBox
          anime={newAnime}
          onEntryChange={typing}
          onEntrySave={createAnime} />
        <MainSection
          animes={animes}
          onDestroy={destroyAnime} />
        <Scoreboard animes={animes} />
      </div>
    );
  }
}

AnimeList.propTypes = {
  animes: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createAnime: PropTypes.func.isRequired,
  destroyAnime: PropTypes.func.isRequired,
  newAnime: PropTypes.string
};

function mapStateToProps(state) {
  return {
    animes: state.anime.animes,
    newAnime: state.anime.newAnime
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createAnime, typing, destroyAnime })(AnimeList);
