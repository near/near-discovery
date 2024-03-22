export const SMALL_SCREEN_LAYOUT_MAX_WIDTH = 1240;
export const SIDEBAR_EXPANDED_PREFERENCE_KEY = 'sidebar-expanded-preference';

export function currentPathMatchesRoute(currentPath: string, routeMatch: string | string[], exactMatch = true) {
  const path = currentPath.split('?').shift() ?? '/';

  const routes = typeof routeMatch === 'string' ? [routeMatch] : routeMatch;
  const matchingRoute = exactMatch ? routes.includes(path) : routes.find((r) => path.indexOf(r) === 0);
  return !!matchingRoute;
}

export function isSmallScreen() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= SMALL_SCREEN_LAYOUT_MAX_WIDTH;
}
