import { combineReducers } from 'redux';
import * as types from '../types';

const loading = (
  state = [],
  action
) => {
  switch(action.type) {
    case types.LOADED:
      return false;
    case types.LOADING:
      return true;
    default:
      return state;
  }
}

export default loading;
