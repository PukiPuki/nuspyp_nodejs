import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getUser: ({token}) => client.request({
      method: 'GET',
      url: `/api/login/${token}`
    }),
    fetchModList: ({token}) => client.request({
      method: 'GET',
      url: `/api/login/fetch/${token}`
    }),
    validate: ({token}) => client.request({
      method: 'GET',
      url: `/api/login/validate/${token}`
    }),
	};
}
