import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage,persist } from 'zustand/middleware';

export const useUUIdStore = create(
  persist(
    (set, get: any) => ({
      uuid: uuidv4(),
    }),
    {
      name: '_uuid',
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
