import type { MouseEvent } from 'react';
import { create } from 'zustand';

export type NavigationDrawer = 'discover' | 'marketing';

const SIDEBAR_EXPANDED_PREFERENCE_KEY = 'sidebar-expanded-preference';

type NavigationState = {
  expandedDrawer: NavigationDrawer | null | undefined;
  expandedDrawerTitle: string;
  initialized: boolean;
  sidebarIsExpanded: boolean;
  sidebarIsOpenedOnSmallScreens: boolean;
};

type NavigationStore = NavigationState & {
  initialize: () => void;
  set: (state: Partial<NavigationState>) => void;
  toggleExpandedDrawer: (drawer: NavigationDrawer, event: MouseEvent<HTMLButtonElement>) => void;
  toggleExpandedSidebar: () => void;
  toggleExpandedSidebarOnSmallScreens: () => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  expandedDrawer: undefined,
  expandedDrawerTitle: '',
  initialized: false,
  sidebarIsExpanded: true,
  sidebarIsOpenedOnSmallScreens: false,

  initialize: () => {
    set((state) => {
      if (state.initialized || typeof window === 'undefined') return {};

      const sidebarIsExpanded = localStorage.getItem(SIDEBAR_EXPANDED_PREFERENCE_KEY) === 'true';

      return {
        initialized: true,
        sidebarIsExpanded,
      };
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
          sidebarIsExpanded: true,
          sidebarIsOpenedOnSmallScreens: true,
        };
      } else {
        const sidebarIsExpanded = !state.sidebarIsExpanded;

        if (typeof window !== 'undefined') {
          localStorage.setItem(SIDEBAR_EXPANDED_PREFERENCE_KEY, sidebarIsExpanded.toString());
        }

        return {
          expandedDrawer: null,
          sidebarIsExpanded,
          sidebarIsOpenedOnSmallScreens: sidebarIsExpanded,
        };
      }
    });
  },

  toggleExpandedSidebarOnSmallScreens: () => {
    set((state) => {
      if (state.sidebarIsOpenedOnSmallScreens) {
        return {
          expandedDrawer: undefined,
          sidebarIsExpanded: false,
          sidebarIsOpenedOnSmallScreens: false,
        };
      } else {
        return {
          sidebarIsExpanded: true,
          sidebarIsOpenedOnSmallScreens: true,
        };
      }
    });
  },

  set: (state) => set(() => state),
}));
