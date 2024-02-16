import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get: any) => ({
      user: {},
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: '_user',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
