import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Drawer from 'material-ui/Drawer'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    console.log(this.state.open);
    console.log(this.state);
  }
  
  handleToggle() {
    console.log(this.state);
    console.log(this.state.open);
    this.setState({
      open: !this.state.open
    })
  }

  handleTap() {
    alert("tapped!");
  }

  render() {
    return (
      <div>

        <MuiThemeProvider>
          <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          />
        </MuiThemeProvider>
        
        <MuiThemeProvider>
          <AppBar title="NUSPYP" onTouchTap={this.handleToggle.bind(this)} />
        </MuiThemeProvider>

        <h1>Hello World</h1>
      </div>
    )
  }
}

export default App;
