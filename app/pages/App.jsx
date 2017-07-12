import React from 'react';
import Page from '../pages/Page';
import AppContainer from '../containers/App';
import { title, meta, link } from './assets';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = props => (
  <Page title={title} meta={meta} link={link}>
    <MuiThemeProvider>
      <AppContainer {...props} />
    </MuiThemeProvider>
  </Page>
);

export default App;
