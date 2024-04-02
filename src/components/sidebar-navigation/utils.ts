export const SMALL_SCREEN_LAYOUT_MAX_WIDTH = 1240;
export const SIDEBAR_EXPANDED_PREFERENCE_KEY = 'sidebar-expanded-preference';
export const PINNED_APPS_CACHE_KEY = 'pinned-apps-cache';

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

export type PinnedApp = {
  authorAccountId: string;
  displayName: string;
  componentName: string;
  imageUrl: string | null;
};

export async function fetchPinnedApps(accountId: string) {
  const result: PinnedApp[] = [];

  try {
    const pinnedKeys = `${accountId}/graph/pin/*/widget/*`;
    const pinnedResponse = await fetch(`https://api.near.social/get?keys=${pinnedKeys}`);
    const pinnedJson = await pinnedResponse.json();
    const pinnedData = pinnedJson[accountId]?.graph?.pin ?? {};

    const componentsKeys: string[] = [];
    Object.keys(pinnedData).forEach((authorAccountId) => {
      Object.keys(pinnedData[authorAccountId].widget).forEach((componentName) => {
        componentsKeys.push(`${authorAccountId}/widget/${componentName}/metadata/**`);
      });
    });

    if (componentsKeys.length === 0) return result;

    const componentsResponse = await fetch(`https://api.near.social/get?keys=${componentsKeys.join('&keys=')}`);
    const componentsJson = await componentsResponse.json();
    Object.keys(componentsJson).forEach((authorAccountId) => {
      Object.keys(componentsJson[authorAccountId].widget).forEach((componentName) => {
        const metadata = componentsJson[authorAccountId].widget[componentName].metadata ?? {};
        result.push({
          authorAccountId,
          componentName,
          displayName: metadata.name || componentName,
          imageUrl: metadata.image?.ipfs_cid
            ? `https://i.near.social/large/https://ipfs.near.social/ipfs/${metadata.image.ipfs_cid}`
            : null,
        });
      });
    });
  } catch (error) {
    console.error('pinned', 'Failed to fetch pinned apps', error);
  }

  return result;
}
