import { moduleService } from '../services';

const fetchData = ({ moduleCode, yearSem }) => {
  console.log("are you fetching thread data")
  return moduleService().getThreads({ moduleCode, yearSem })
  .then(res => res.data)
  // Returning [] as a placeholder now so it does not error out when this service
  // fails. We should be handling this in our DISPATCH_REQUEST_FAILURE
  .catch(() => []);
};

export default fetchData;

