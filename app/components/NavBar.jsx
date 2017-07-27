import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import styles from '../css/components/navigation';
import classNames from 'classnames/bind';

// Material Ui
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import SearchBar from 'components/SearchBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ivle_api_key from '../../config/lapi.js';

import { browserHistory } from 'react-router';

const cx = classNames.bind(styles);

export default class DrawerUndockedExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  loginButton() {
    browserHistory.push('/login');
  }

  homeButton() {
    browserHistory.push('/');
  }


  render() {
	const { user, logOut } = this.props;
    return (
      <div>
        <Drawer
          docked={false}
        	width={200}
        	open={this.state.open}
        	onRequestChange={(open) => this.setState({open})}>
        	<MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
        </Drawer>

	  <AppBar
	    title="NUSPYP" 
	    onTitleTouchTap={this.homeButton}
	    onLeftIconButtonTouchTap={this.handleToggle}> 
	    <ToolbarGroup>
	  		<SearchBar />
	    </ToolbarGroup>
	  	<ToolbarGroup lastChild={true}>
				<FlatButton 
					label="Login" 
					href={`https://ivle.nus.edu.sg/api/login/?apikey=${ivle_api_key}&url=http://localhost:3000/callback`} 
					style={{color: "white"}}
				/>			
	  	</ToolbarGroup>
		</AppBar>
  </div>);
  }
}


