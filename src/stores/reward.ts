import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useRewardStore = create(
  persist(
    (set, get: any) => ({
      reward: {},
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: '_reward',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
