/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { nusLoginService } from '../services';

export function getUser(token){
	return (dispatch)	=> {
		nusLoginService().getUser()
			.then((res) => {
				const result = {type:types.NUS_LOGIN_SUCCESS, userid:res.data};
				return dispatch(result);
		})	
	}
}

export function fetchModList(token){
	return (dispatch)	=> {
		nusLoginService().fetchModList()
			.then((res) => {
				const result = {type:types.FETCH_MODULE_LIST, modList:res.data};
				return dispatch(result);
		})	
	}
}

export function validate(token){
	return (dispatch)	=> {
		nusLoginService().validate()
			.then((res) => {
				const result = {type:types.VALIDATE, modList:res.data};
				return dispatch(result);
		})	
	}
}
