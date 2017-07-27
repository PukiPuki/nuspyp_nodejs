import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getModules: () => client.request({
      method: 'GET',
      url: '/api/modules'
    }),
    getPapers: ({ moduleCode }) => client.request({
      method: 'GET',
      url: `/api/modules/${moduleCode}`,
    }),
    getThreads: ({ moduleCode, yearSem }) => client.request({
      method: 'GET',
      url: `/api/modules/${moduleCode}/${yearSem}`,
    }),
    postThread: (Thread) => {
      const { ModuleCode, Year, Sem } = Thread
      const YearSem = ""+Year+Sem
      const data = Thread
      return client.request({
        method: 'POST',
        url: `/api/modules/${ModuleCode}/${YearSem}`,
        data
      })
    },
    postCommentToThread: (comment) => {
      const data = comment
      return client.request({
        method: 'POST',
        url: `/api/threads`,
        data
      })
    },
    getArrayOfComments: (arrayOfId) => {
      const data = arrayOfId
      return client.request({
        method: 'GET',
        url: `/api/comments`,
        data
      })
    },
    postCommentToComment: (comment) => {
      const data = comment
      return client.request({
        method: 'POST',
        url: `/api/comments`,
        data
      })
    },
  };
};

