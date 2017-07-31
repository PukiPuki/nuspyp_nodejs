import { moduleService } from '../services';

const fetchData = ({ threadId }) => {
  return moduleService().getThread2({ threadId })
  .then(res => {
    return res.data
  })
  // Returning [] as a placeholder now so it does not error out when this service
  // fails. We should be handling this in our DISPATCH_REQUEST_FAILURE
  .catch(() => []);
};

export default fetchData;

