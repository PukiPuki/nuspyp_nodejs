import React,{ Component } from 'react';
import ivle_api_key from '../../config/lapi.js';
import { getUser, fetchModList, validate } from '../actions/nususers2.js';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'


class Login extends Component {
	constructor(){
		super();
		this.state = {open:false};
	}

	handleClose() {
		this.setState({open:false});
	}

	redirect() {
			this.props.router.href(`https://ivle.nus.edu.sg/api/login/?apikey=${ivle_api_key}&url=http://localhost:3000/callback`);
	}

	componentWillMount() {
		console.log("marker");
		console.log(this.props)
		const { getUser, fetchModList, validate} = this.props;
    const token = this.props.location.query.token;
		// validate(token);
		console.log("Validate");
		console.log(validate(token));
		// if (validate(token)){
			// console.log("True");
			// getUser(token);
			// fetchModList(token);
		// } else {
			// this.setState({open:true})
			// console.log("False");
		// }
	}

	render() {
  	const actions = [
			<FlatButton
  	    label="Cancel"
  	    primary={true}
  	    onTouchTap={this.handleClose.bind(this)}
  	  />,
  	  <FlatButton
  	    label="IVLE Login"
  	    primary={true}
  	    onTouchTap={this.redirect.bind(this)}
  	  />,
			];

    return (
			<div>
					<Dialog 
						actions={actions}
						modal={true}
						open={this.state.open}
						onRequestClose={this.handleClose}>
						Invalid token. Redirecting to IVLE Login Page in 5 seconds...
					</Dialog>
			</div>
    );
  }
}

function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps, { getUser, fetchModList, validate })(Login);
