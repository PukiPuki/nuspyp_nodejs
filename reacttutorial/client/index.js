import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, hashHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App.jsx';

const app = document.getElementById('app');

console.log("hello sleep walkers");
ReactDOM.render(
  <Router>
    <Route path='/' component={App}>
    </Route>
  </Router>,
app);
