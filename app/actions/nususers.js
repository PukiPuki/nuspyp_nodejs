import { push } from 'react-router-redux';
import { authService } from '../services';
import * as types from '../types';
import ivle_api_key from '../../config/lapi.js';
import jsonp from 'jsonp'

function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess(message) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
}

function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function manualLogin(data) {
  return (dispatch) => {
    dispatch(beginLogin());

    return authService().login(data)
      .then((response) => {
          dispatch(loginSuccess('You have been successfully logged in'));
          dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(loginError('Oops! Invalid username or password'));
      });
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(beginSignUp());

    return authService().signUp(data)
      .then((response) => {
          dispatch(signUpSuccess('You have successfully registered an account!'));
          dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(signUpError('Oops! Something went wrong when signing up'));
      });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());

    return authService().logOut()
      .then((response) => {
          dispatch(logoutSuccess());
      })
      .catch((err) => {
        dispatch(logoutError());
      });
  };
}

export function NUSLogin(token) {
  return (dispatch) => {
	 const url = `https://ivle.nus.edu.sg/api/Lapi.svc/UserID_Get?APIKey=${ivle_api_key}&Token=${token}`

		jsonp(url, null, function(err,data){
			if (err) {
				console.error(err.message);
			} else {
				const result = {type: types.NUS_LOGIN_SUCCESS, userid: data};
				dispatch(result);
			}
		});
	};
}

export function validate(token) {
  return (dispatch) => {
			const url = `
https://ivle.nus.edu.sg/api/Lapi.svc/Validate?APIKey=${ivle_api_key}&Token=${token}`
				var success = false;
				jsonp(url, null, function(err,data){
				if (err) {
					console.error(err.message);
				} else {
					// const result = {type:types.VALIDATE, success:data.Success};
					// dispatch(result);
					console.log("Data");
					console.log(data.Success);
					success= data.Success;
				}
			});
}


export function fetchModList(token) {
  return (dispatch) => {
	 const url = `https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey=${ivle_api_key}&AuthToken=${token}&Duration=10&IncludeAllInfo=false`

		jsonp(url, null, function(err,data){
			if (err) {
				console.error(err.message);
			} else {
				const result = {type: types.FETCH_MODULE_LIST, modList: data};
				dispatch(result);
			}
		});
	};
}
