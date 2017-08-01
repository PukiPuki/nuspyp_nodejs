import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchModuleData, fetchThreadData, fetchThread2Data } from './fetch-data';
import { App, Module, Vote, Dashboard, About, LoginOrRegister, Thread, ThreadList } from './pages';
import Login from './components/Login';
import ivle_api_key from '../config/lapi.js';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Vote} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="about" component={Dashboard} />

      <Route path="modules/:moduleCode" component={Module} fetchData={fetchModuleData} />
      <Route path="modules/:moduleCode/:yearSem" component={ThreadList} fetchData={fetchThreadData} />
      <Route path="modules/:moduleCode/:yearSem/:threadId" component={Thread} fetchData={fetchThread2Data} />

      <Route path="callback" component={Login} />
			<Route path="nusLogin" component={() => {window.location =`https://ivle.nus.edu.sg/api/login/?apikey=${ivle_api_key}&url=http://localhost:3000/callback`}} />
    </Route>
  );
};
