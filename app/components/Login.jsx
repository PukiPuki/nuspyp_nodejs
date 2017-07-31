import React,{ Component } from 'react';
import ivle_api_key from '../../config/lapi.js';
import { all } from '../actions/nususers2.js';
import { connect } from 'react-redux';


class Login extends Component {

	redirect() {
			this.props.router.href(`https://ivle.nus.edu.sg/api/login/?apikey=${ivle_api_key}&url=http://localhost:3000/callback`);
	}

	componentWillMount() {
		const { all} = this.props;
    const token = this.props.location.query.token;
		all({token});

	}

	render() {
		return <div> </div>;
  }
}

function mapStateToProps(state) {
	return {
		data: state.nusLogin.all
	}
}

export default connect(mapStateToProps, { all })(Login);
