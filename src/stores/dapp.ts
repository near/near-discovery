import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useDappStore = create(
  persist(
    (set, get: any) => ({
      dapp: {},
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: '_current_dapp',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
