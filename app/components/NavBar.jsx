import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import styles from '../css/components/navigation';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

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

class NavBar extends React.Component {
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

	modRedirect(module){
		browserHistory.push(`/1`);
	}


  render() {
	const { user, logOut } = this.props;
	const loadMods = (modsArr) => {
			if (modsArr == undefined) console.error('Not logged in!'); 
			else {
			return modsArr.map((module) =>{
				return <MenuItem onTouchTap={this.modRedirect(module)}>{module}</MenuItem>;
			});
			}
	};
    return (
      <div>
        <Drawer
          docked={false}
        	width={200}
        	open={this.state.open}
        	onRequestChange={(open) => this.setState({open})}>
				{loadMods(this.props.lapi.mods)}
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

function mapStateToProps(state){
	return {
		lapi: state.nusLogin.all
	}
}

export default connect(mapStateToProps)(NavBar);
