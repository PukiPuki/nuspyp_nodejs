import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from '../actions/users';
import styles from '../css/components/login';
import hourGlassSvg from '../images/hourglass.svg';

import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
const cx = classNames.bind(styles);

class MyLoginOrRegister extends Component {
  constructor() {
    super()
    this.state = {email: "", password: "", username: ""};
  }

  handleEmail(e) {
    this.setState({email: e.target.value
    , emailError: ""})
  }

  handlePassword(e) {
    this.setState({password: e.target.value
    , passwordError: ""})
  }

  handleUsername(e) {
    this.setState({username: e.target.value
    , usernameError: ""})
  }

  handleLogin(e) {
    if(this.state.email !== ""
    && this.state.password !== "") {
      const { manualLogin } = this.props;
      const email = this.state.email;
      const password = this.state.password;
      manualLogin({ email, password });
    } else {
    if(this.state.email == "") this.setState({emailError: "This field is required."}) 
    if(this.state.password == "") this.setState({passwordError: "This field is required."}) 
    }
  }

  handleRegister(e) {
    if(this.state.email !== ""
    && this.state.password !== ""
    && this.state.username !== "") {
      const { signUp } = this.props;
      const email = this.state.email;
      const password = this.state.password;
      const username = this.state.username;
      signUp({ email, password, username });
    } else {
    if(this.state.email == "") this.setState({emailError: "This field is required."}) 
    if(this.state.password == "") this.setState({passwordError: "This field is required."}) 
    if(this.state.username == "") this.setState({usernameError: "This field is required."}) 
    }
  }
  EmailPassword() {
    return (
      <div>
        <TextField hintText="Email" onChange={this.handleEmail.bind(this)} value={this.state.email}
          errorText={this.state.emailError}/><br />
        <TextField hintText="Password" onChange={this.handlePassword.bind(this)} value={this.state.password}
          type="password" errorText={this.state.passwordError}/><br />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Tabs>
          <Tab label="Login">
            {this.EmailPassword()}
            <RaisedButton label="Login" primary={true} onClick={this.handleLogin.bind(this)}/><br />
            <RaisedButton label="Login with Google" secondary={true} href="/auth/google" />
          </Tab>
          <Tab label="Register">
            <TextField hintText="Username" onChange={this.handleUsername.bind(this)} errorText={this.state.usernameError}/><br />
            {this.EmailPassword()}
            <RaisedButton label="Register" primary={true} onClick={this.handleRegister.bind(this)}/>
          </Tab>
        </Tabs>

      </div>
    )
  }
}

class LoginOrRegister extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (isLogin) {
      manualLogin({ email, password });
    } else {
      signUp({ email, password });
    }
  }

  renderHeader() {
    const { user: { isLogin }, toggleLoginMode } = this.props;
    if (isLogin) {
      return (
        <div className={cx('header')}>
          <h1 className={cx('heading')}>Login with Email</h1>
          <div className={cx('alternative')}>
            Not what you want?
            <a
              className={cx('alternative-link')}
              onClick={toggleLoginMode}
            >Register an Account</a>
          </div>
        </div>
      );
    }

    return (
      <div className={cx('header')}>
        <h1 className={cx('heading')}>Register with Email</h1>
        <div className={cx('alternative')}>
          Already have an account?
          <a
            className={cx('alternative-link')}
            onClick={toggleLoginMode}
          >Login</a>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;

    return (
      <div
        className={cx('login', {
          waiting: isWaiting
        })}
      >
        <div className={cx('container')}>
          { this.renderHeader() }
          <img className={cx('loading')} alt="loading" src={hourGlassSvg} />
          <div className={cx('email-container')}>
            <form onSubmit={this.handleOnSubmit}>
              <input
                className={cx('input')}
                type="email"
                ref="email"
               placeholder="email"
              />
              <input
                className={cx('input')}
                type="password"
               ref="password"
                placeholder="password"
              />
              <div className={cx('hint')}>
                <div>Hint</div>
                <div>email: example@ninja.com password: ninja</div>
              </div>
              <p
                className={cx('message', {
                'message-show': message && message.length > 0
              })}>{message}</p>
              <input
                className={cx('button')}
                type="submit"
                value={isLogin ? 'Login' : 'Register'} />
            </form>
          </div>
          <div className={cx('google-container')}>
            <h1 className={cx('heading')}>Google Login Demo</h1>
            <a
              className={cx('button')}
              href="/auth/google">Login with Google</a>
          </div>
        </div>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({user}) {
  return {
    user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, { manualLogin, signUp, toggleLoginMode })(MyLoginOrRegister);

