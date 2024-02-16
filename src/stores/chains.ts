import { create } from 'zustand';
import { createJSONStorage,persist } from 'zustand/middleware';

export const useChainsStore = create(
  persist(
    (set, get: any) => ({
      chains: [],
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: '_chains',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
