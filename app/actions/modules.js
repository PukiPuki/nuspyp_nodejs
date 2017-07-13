/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { moduleService } from '../services';

function createModuleRequest(data) {
  return {
    type: types.CREATE_MODULE_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}
