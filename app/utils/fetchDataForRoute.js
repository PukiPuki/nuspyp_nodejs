const defaultFetchData = () => Promise.resolve();

function fetchDataForRoute({ routes, params }) {
  const matchedRoute = routes[routes.length - 1];
  console.log("matchedRoute");
  console.log(matchedRoute);
  const fetchDataHandler = matchedRoute.fetchData || defaultFetchData;
  return fetchDataHandler(params);
}

export default fetchDataForRoute;

