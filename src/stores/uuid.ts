import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

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
