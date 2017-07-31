/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { nusLoginService } from '../services';
import {push} from 'react-router-redux';
import {ivle_api_key} from '../../config/lapi.js'

export function all(token){
	return (dispatch)	=> {
		nusLoginService().all(token)
			.then((res) => {
				const result = {type:types.FETCH_LAPI_SUCCESS, data:res.data};
				switch (result.data.success){
					case true:	
						// dispatch(push('/'));
						return dispatch(result);
					case false:
						alert('Invalid token.Please login again.');
						// return dispatch(push('/'));
				}
		})	
	};
}
export function getUser(token){
	return (dispatch)	=> {
		nusLoginService().getUser(token)
			.then((res) => {
				const result = {type:types.NUS_LOGIN_SUCCESS, userid:res.data};
				return dispatch(result);
		})	
	}
}

export function fetchModList(token){
	return (dispatch)	=> {
		nusLoginService().fetchModList(token)
			.then((res) => {
				const result = {type:types.FETCH_MODULE_LIST, modList:res.data};
				return dispatch(result);
		})	
	}
}

export function validate(token){
	return (dispatch)	=> {
		nusLoginService().validate(token)
			.then((res) => {
				return dispatch(res);
		})	
	}
}
