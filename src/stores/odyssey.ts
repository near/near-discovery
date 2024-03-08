import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useOdysseyStore = create(
  persist(
    (set, get: any) => ({
      odyssey: [],
      setOdyssey: (list: any) => set(() => ({ odyssey: list })),
    }),
    {
      name: '_cached_odyssey',
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
