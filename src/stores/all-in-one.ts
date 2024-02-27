import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TabState = {
  tab: string;
};

type TabStore = TabState & {
  set: (update: TabState) => void;
};

export const useAllInOneTabStore = create<TabStore>((set) => ({
  tab: '',
  set: (params) => set(() => ({ ...params })),
}));

export const useAllInOneTabCachedStore = create(
  persist(
    (set, get: any) => ({
      chains: {},
      setCachedTab: (tab: string, chainId: number) => {
        const _cachedTabs = get().chains;
        set({
          chains: { ..._cachedTabs, [chainId]: tab },
        });
      },
    }),
    {
      name: '_cached_all_in_one_tab',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
