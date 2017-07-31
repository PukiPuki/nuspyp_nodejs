import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchModuleData, fetchThreadData, fetchThread2Data } from './fetch-data';
import { App, Module, Vote, Dashboard, About, LoginOrRegister, Lvl1, Lvl2, Thread, Question } from './pages';
import Login from './components/Login';

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
        <Route path="modules/:moduleCode/:yearSem" component={Thread} fetchData={fetchThreadData} />
        <Route path="modules/:moduleCode/:yearSem/:threadId" component={Question} fetchData={fetchThread2Data} />
      <Route path="lvl1" component={Lvl1} fetchData={fetchModuleData}>
        <Route path="lvl2" component={Lvl2}>
        </Route>
      </Route>
      <Route path="callback" component={Login} />
    </Route>
  );
};
