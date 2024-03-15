import type { MouseEvent } from 'react';
import { create } from 'zustand';

import { isSmallScreen, SIDEBAR_EXPANDED_PREFERENCE_KEY } from './utils';

export type NavigationDrawer = 'discover' | 'marketing';

type NavigationState = {
  expandedDrawer: NavigationDrawer | null | undefined;
  expandedDrawerTitle: string;
  hasInitialized: boolean;
  isOpenedOnSmallScreens: boolean;
  isSidebarExpanded: boolean;
};

type NavigationStore = NavigationState & {
  initialize: () => void;
  handleBubbledClickInDrawer: () => void;
  handleBubbledClickInSidebar: (event: MouseEvent<HTMLDivElement>) => void;
  set: (state: Partial<NavigationState>) => void;
  setInitialExpandedDrawer: (drawer: NavigationDrawer) => void;
  toggleExpandedDrawer: (drawer: NavigationDrawer, event: MouseEvent<HTMLButtonElement>) => void;
  toggleExpandedSidebar: () => void;
  toggleExpandedSidebarOnSmallScreens: () => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  expandedDrawer: undefined,
  expandedDrawerTitle: '',
  hasInitialized: false,
  isOpenedOnSmallScreens: false,
  isSidebarExpanded: true,

  initialize: () => {
    set((state) => {
      if (state.hasInitialized || typeof window === 'undefined') return {};

      const isSidebarExpanded = isSmallScreen() && localStorage.getItem(SIDEBAR_EXPANDED_PREFERENCE_KEY) !== 'false';

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

  set: (state) => set(() => state),
}));
