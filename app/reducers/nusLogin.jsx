import { combineReducers } from 'redux';
import * as types from '../types';

const all = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.FETCH_LAPI_SUCCESS:
      return action.data;
		default:
			return state;
	}
};

const getUser = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.NUS_LOGIN_SUCCESS:
      return action.userid;
		default:
			return state;
	}
};
const fetchModList = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.FETCH_MODULE_LIST:
      return action.modList;
		default:
			return state;
	}
};

const validate = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.VALIDATE:
      return action.success;
		default:
			return state;
	}
};

const nusLoginReducer = combineReducers({
	all,
	getUser,
	fetchModList,
	validate
})

export default nusLoginReducer;
