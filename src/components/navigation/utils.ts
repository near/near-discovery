export const currentPathMatchesRoute = (currentPath: string, routeMatch: string | string[], exactMatch = false) => {
  const path = currentPath.split('?').shift() ?? '/';

  const routes = typeof routeMatch === 'string' ? [routeMatch] : routeMatch;
  const matchingRoute = exactMatch ? routes.includes(path) : routes.find((r) => path.indexOf(r) === 0);
  return !!matchingRoute;
};
