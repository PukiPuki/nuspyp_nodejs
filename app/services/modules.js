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
    postThread: ({ Thread }) => client.request({
      method: 'POST',
      url: `/api/modules/${moduleCode}/${yearSem}`,
    }),
  };
};

