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

export function postThread( Thread ) {
  return (dispatch) => {
    moduleService().postThread(Thread)
      .then((res) => {
        const { ModuleCode, Year, Sem } = Thread;
        const moduleCode = ModuleCode;
        const yearSem = ""+Year+Sem;
        return moduleService().getThreads({ moduleCode, yearSem })
          .then((res) => {
            console.log(res);
            return dispatch(res.data);
          })
      })
  }
}

export function goToThread(here) {
  return (dispatch) => {
    dispatch(push(here));
  }
}

export function postCommentToThread(comment) {
  return (dispatch) => {
    moduleService().postCommentToThread(comment)
      .then((res) => {
        const threadId = comment.ReplyToId
        moduleService().getThread2({threadId})
          .then((res) => {
            return dispatch(res.data)
          })
      })
  }
}

export function postCommentToComment({comment, threadId}) {
  return (dispatch) => {
    moduleService().postCommentToComment(comment)
      .then((res) => {
        moduleService().getThread2({threadId})
          .then((res) => {
            return dispatch(res.data)
          })
      })
  }
}

export function getArrayOfComments(arrayOfId) {
  console.log("get array of comments deprecated");
  return (dispatch) => {
    moduleService().getArrayOfComments(arrayOfId)
      .then((res) => {
        dispatch({type: types.COMMENTS_REQUEST_SUCCESS, data: res.data})
      })
  }
}

export function getThread2({threadId}) {
  return (dispatch) => {
    moduleService().getThread2({threadId})
      .then((res) => {
        return dispatch(res.data);
      })
  }
}

export function updateComment({comment, threadId}) {
  return (dispatch) => {
    moduleService().updateComment({comment})
      .then((res) => {
        moduleService().getThread2({threadId})
          .then((res) => {
            return dispatch(res.data);
          })
      })
  }
}
