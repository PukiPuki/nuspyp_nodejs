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

const moduleList = (
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

const papers = (
  state = [],
  action
) => {
  switch(action.type) {
    case types.PAPERS_REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    default:
      return state;
  }
}

const threads = (
  state = [],
  action
) => {
  switch(action.type) {
    case types.THREADS_REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    default:
      return state;
  }
}

const thread = (
  state = [],
  action
) => {
  switch(action.type) {
    case types.ONE_THREAD_REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    default:
      return state;
  }
}

const comments = (
  state = [],
  action
) => {
  switch(action.type) {
    case types.COMMENTS_REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    default:
      return state;
  }
}

const snackStatus = (
  state = [],
  action
) => {
  switch(action.type) {
    case types.FLIP:
      console.log("action.data")
      console.log(action.data)
      if (action.data) return action.data;
      return state;
    default:
      return state;
  }
}
const moduleReducer = combineReducers({
  moduleList,
  modulefs,
  papers,
  thread,
  threads,
  comments,
  snackStatus,
})

export default moduleReducer;
