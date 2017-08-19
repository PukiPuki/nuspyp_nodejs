import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import styles from '../css/components/navigation';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { logOut } from '../actions/users';

// Material UI
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import SearchBar from 'components/SearchBar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Book from 'material-ui/svg-icons/action/book';
import Divider from 'material-ui/Divider';
import Settings from 'material-ui/svg-icons/action/settings';
import SignOut from 'material-ui/svg-icons/action/exit-to-app';
import SignIn from 'material-ui/svg-icons/action/perm-identity';
import Avatar from 'material-ui/Avatar';
import {Card, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';


//Import IVLE API Key
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


  homeButton() {
    browserHistory.push('/');
  }

	modRedirect = (module) => {
		browserHistory.push(`/modules/${module}`);
		this.handleClose();
	}

	getUserID = () => {
		console.log("USERID");
		console.log(this.props.user);
		return (!this.props.user.authenticated) 
			? 'Not logged in'
			: this.props.user.session.displayName
	}

	signButton = () => {
		return (this.props.lapi.userid == undefined)
			? <a href = {`https://ivle.nus.edu.sg/api/login/?apikey=${ivle_api_key}&url=http://localhost:3000/callback`} > 
				<MenuItem leftIcon={<SignIn />}> Fetch Modules </MenuItem> </a>
			: ""  
	}

	reactLogin = () => {
		browserHistory.push('/login');
		this.handleClose();
	}

	reactLogout = (logOut) => {
		logOut();
		browserHistory.push('/');
		this.handleClose();
	}

	reactLoginButton = ({user, logOut}) => {
		return (!user.authenticated)
			?	<MenuItem leftIcon={<SignIn />} onTouchTap={() => {this.reactLogin()}}>React Sign In </MenuItem>
			: <MenuItem  leftIcon={<SignOut />} onTouchTap={() => this.reactLogout(logOut)}>React Sign Out </MenuItem>
	}

  render() {
	const { user, logOut } = this.props;
	const loadMods = (modsArr) => {
		if (this.props.lapi.mods != undefined){
			if (modsArr == undefined) console.error('Not logged in!'); 
			else {
			return modsArr.map((module) =>{
				return <MenuItem leftIcon={<Book />} onTouchTap={()=> this.modRedirect(module)}>{module}</MenuItem>;
			});
			}
		}
	};
    return (
      <div>
        <Drawer
          docked={false}
        	width={250}
        	open={this.state.open}
        	onRequestChange={(open) => this.setState({open})}>
					<Card>
						<CardMedia 
							overlay={
								<div>
									<CardTitle 
										title={this.getUserID()} 
										titleColor={"white"}
									/>
								</div>
							}
						>
								<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrsglofapYQYCRCMGg4C2JYOZl_feAj6l5QNl2p1K2UBYnK0VF' />
							</CardMedia>
						</Card>

					<Divider />
						{this.signButton()}
						{this.reactLoginButton({user, logOut})}
					<Divider />
						{loadMods(['ACC1002X'])}
						{loadMods(this.props.lapi.mods)}
					<Divider />
        </Drawer>

	  <AppBar
	    title="NUSPYP" 
	    onTitleTouchTap={this.homeButton}
	    onLeftIconButtonTouchTap={this.handleToggle} 
	    iconElementRight={<SearchBar />}>
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
