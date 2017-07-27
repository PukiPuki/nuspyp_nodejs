const defaultFetchData = () => Promise.resolve();

function fetchDataForRoute({ routes, params }) {
  const matchedRoute = routes[routes.length - 1];
  const fetchDataHandler = matchedRoute.fetchData || defaultFetchData;
  console.log(params)
  return fetchDataHandler(params);
}

export default fetchDataForRoute;

