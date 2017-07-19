import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getModules: () => client.request({
      method: 'GET',
      url: '/api/modules'
    }),
    getPapers: ({ id }) => client.request({
      method: 'GET',
      url: `/api/modules/${id}`,
    })
  };
};

