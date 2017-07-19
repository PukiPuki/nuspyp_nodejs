/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { moduleService } from '../services';
// import { modulefsService } from '../services';

function createModuleRequest(data) {
  return {
    type: types.CREATE_MODULE_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

export function getModuleRequest() {
  return (dispatch) => {
    moduleService().getModules()
      .then((res) => {
        const mydata = res.data;
        return dispatch({type: types.MODULE_REQUEST_SUCCESS, mydata });
      })
  }
}

// export function getModuleYearsSemsRequest(id) {
//   return (dispatch) => {
//     modulefsService().getYearsSems({ id })
//       .then((res) => {
//         console.log('res');
//         console.log(res);
//         const data = res.data;
//         return dispatch({ type: types.MODULE_YEARS_SEMS_REQUEST_SUCCESS, data });
//       })
//   }
// }
