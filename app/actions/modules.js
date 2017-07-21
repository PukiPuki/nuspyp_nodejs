/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { moduleService } from '../services';
import { push } from 'react-router-redux';
// import { modulefsService } from '../services';

export function getModuleRequest() {
  return (dispatch) => {
    moduleService().getModules()
      .then((res) => {
        const mydata = res.data;
        return dispatch({type: types.MODULE_REQUEST_SUCCESS, mydata });
      })
  }
}

export function goToThread(here) {
  return (dispatch) => {
    dispatch(push(here));
  }
}

