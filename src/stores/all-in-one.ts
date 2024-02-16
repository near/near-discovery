import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAllInOneStore = create(
  persist(
    (set, get: any) => ({
      allInOne: {},
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: '_current_all_in_one',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
