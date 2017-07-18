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
  }
}

const modules = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.MODULE_REQUEST_SUCCESS:
      return action.mydata;
    default:
      return state;
  }
}

const modulefs = (
  state = [],
  action
) => {
  switch(action.type) {
    case types.MODULE_YEARS_SEMS_REQUEST_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

const moduleReducer = combineReducers({
  modules,
  modulefs,
})

export default moduleReducer;
