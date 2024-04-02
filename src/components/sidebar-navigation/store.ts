import type { MouseEvent } from 'react';
import { create } from 'zustand';

import type { PinnedApp } from './utils';
import { fetchPinnedApps, isSmallScreen, PINNED_APPS_CACHE_KEY, SIDEBAR_EXPANDED_PREFERENCE_KEY } from './utils';

export type NavigationDrawer = 'discover' | 'marketing';

type NavigationState = {
  currentPageTitle: string | null;
  expandedDrawer: NavigationDrawer | null | undefined;
  expandedDrawerTitle: string;
  hasInitialized: boolean;
  isOpenedOnSmallScreens: boolean;
  isSidebarExpanded: boolean;
  pinnedApps: PinnedApp[] | null;
};

type NavigationStore = NavigationState & {
  initialize: () => void;
  handleBubbledClickInDrawer: () => void;
  handleBubbledClickInSidebar: (event: MouseEvent<HTMLDivElement>) => void;
  loadPinnedApps: (accountId: string | null) => Promise<void>;
  modifyPinnedApps: (app: PinnedApp, modification: 'PINNED' | 'UNPINNED') => void;
  reset: () => void;
  set: (state: Partial<NavigationState>) => void;
  setCurrentPageTitle: (title: string | null) => void;
  setInitialExpandedDrawer: (drawer: NavigationDrawer) => void;
  toggleExpandedDrawer: (drawer: NavigationDrawer, event: MouseEvent<HTMLButtonElement>) => void;
  toggleExpandedSidebar: () => void;
  toggleExpandedSidebarOnSmallScreens: () => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentPageTitle: null,
  expandedDrawer: undefined,
  expandedDrawerTitle: '',
  hasInitialized: false,
  isOpenedOnSmallScreens: false,
  isSidebarExpanded: true,
  pinnedApps: null,

  initialize: () => {
    set((state) => {
      if (state.hasInitialized || typeof window === 'undefined') return {};

      const isSidebarExpanded = isSmallScreen() || localStorage.getItem(SIDEBAR_EXPANDED_PREFERENCE_KEY) !== 'false';

      return {
        hasInitialized: true,
        isSidebarExpanded,
      };
    });
  },

  handleBubbledClickInDrawer: () => {
    if (isSmallScreen()) {
      set({ isOpenedOnSmallScreens: false });
    }
  },

  handleBubbledClickInSidebar: (event) => {
    const target = event.target as HTMLElement | null;
    const clickedOnLink =
      target?.tagName === 'A' ||
      target?.parentElement?.tagName === 'A' ||
      target?.parentElement?.parentElement?.tagName === 'A';

    set((state) => {
      if ((isSmallScreen() && !state.expandedDrawer) || clickedOnLink) {
        return { isOpenedOnSmallScreens: false, expandedDrawer: undefined };
      } else {
        return { expandedDrawer: null };
      }
    });
  },

  loadPinnedApps: async (accountId) => {
    /*
      Event if we don't have an accountId yet (wallet state is still resolving on the client side),
      we can load the previously cached pinned apps instantly to improve perceived performance in 
      the sidebar. The pinned apps cache is cleared out when the user logs out - which triggers the 
      reset() action.
    */

    const cachedPinnedAppsStringified = localStorage.getItem(PINNED_APPS_CACHE_KEY);
    if (cachedPinnedAppsStringified) {
      try {
        const cachedPinnedApps = JSON.parse(cachedPinnedAppsStringified);
        set({ pinnedApps: cachedPinnedApps });
      } catch (error) {
        console.error('Failed to parse cached pinned apps', error);
      }
    }

    if (!accountId) return;

    const pinnedApps = await fetchPinnedApps(accountId);
    localStorage.setItem(PINNED_APPS_CACHE_KEY, JSON.stringify(pinnedApps));

    set({ pinnedApps });
  },

  modifyPinnedApps: (modifiedApp, modification) => {
    set((state) => {
      let pinnedApps = [...(state.pinnedApps || [])];

      if (modification === 'PINNED') {
        const existingPinnedApp = pinnedApps.find((pinnedApp) => {
          const pinnedAppId = pinnedApp.authorAccountId + pinnedApp.componentName;
          const modifiedAppId = modifiedApp.authorAccountId + modifiedApp.componentName;
          return pinnedAppId === modifiedAppId;
        });

        if (!existingPinnedApp) {
          // Avoid adding a duplicate if it's already pinned
          pinnedApps.push(modifiedApp);
        }
      } else if (modification === 'UNPINNED') {
        pinnedApps = pinnedApps.filter((pinnedApp) => {
          const pinnedAppId = pinnedApp.authorAccountId + pinnedApp.componentName;
          const modifiedAppId = modifiedApp.authorAccountId + modifiedApp.componentName;
          return pinnedAppId !== modifiedAppId;
        });
      } else {
        console.error('Unimplemented modification type in modifyPinnedApps():', modification);
      }

      localStorage.setItem(PINNED_APPS_CACHE_KEY, JSON.stringify(pinnedApps));

      return {
        pinnedApps,
      };
    });
  },

  reset: () => {
    localStorage.removeItem(PINNED_APPS_CACHE_KEY);
    set({ pinnedApps: null });
  },

  set: (state) => set(() => state),

  setCurrentPageTitle: (currentPageTitle) => set(() => ({ currentPageTitle })),

  setInitialExpandedDrawer: (drawer) => {
    set((state) => {
      if (typeof state.expandedDrawer !== 'undefined') return {};
      return { expandedDrawer: drawer };
    });
  },

  toggleExpandedDrawer: (drawer, event) => {
    event.stopPropagation();

    set((state) => ({
      expandedDrawer: state.expandedDrawer === drawer ? null : drawer,
    }));
  },

  toggleExpandedSidebar: () => {
    set((state) => {
      if (state.expandedDrawer) {
        return {
          expandedDrawer: null,
          isSidebarExpanded: true,
          isOpenedOnSmallScreens: true,
        };
      } else {
        const isSidebarExpanded = !state.isSidebarExpanded;

        if (typeof window !== 'undefined') {
          localStorage.setItem(SIDEBAR_EXPANDED_PREFERENCE_KEY, isSidebarExpanded.toString());
        }

        return {
          expandedDrawer: null,
          isSidebarExpanded,
          isOpenedOnSmallScreens: isSidebarExpanded,
        };
      }
    });
  },

  toggleExpandedSidebarOnSmallScreens: () => {
    set((state) => {
      if (state.isOpenedOnSmallScreens) {
        return {
          expandedDrawer: undefined,
          isSidebarExpanded: false,
          isOpenedOnSmallScreens: false,
        };
      } else {
        return {
          isSidebarExpanded: true,
          isOpenedOnSmallScreens: true,
        };
      }
    });
  },
}));
