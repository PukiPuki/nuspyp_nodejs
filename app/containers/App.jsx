import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Navigation from '../containers/Navigation';
import Message from '../containers/Message';

import Loading from './Loading';


const App = ({ children }) => {
  return (
    <div>
      <Navigation />
      <Message />
      <Loading component={children} />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
