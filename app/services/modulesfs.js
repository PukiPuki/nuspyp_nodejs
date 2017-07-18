import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getYearsSems: ({ id }) => client.request({
      method: 'GET',
      url: `/module/${id}`,
    })
  };
};

