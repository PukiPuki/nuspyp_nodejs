import { combineReducers } from 'redux';
import * as types from '../types';

const module = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_MODULE_REQUEST:
      return {
        id: action.id,
        count: action.count,
        text: action.text
      }
    default:
      return state;
  }
}

const modules = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.MODULE_REQUEST_SUCCESS:
      if (action.data) return action.data;
      console.log("action.data");
      console.log(action.data);
      return state;
    default:
      return state;
  }
};

const moduleReducer = combineReducers({
  modules,
});

export default moduleReducer;
