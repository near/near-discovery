import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type CurrentComponentStore = {
  src: string | null;
  setSrc: (src: string | null) => void;
};

export const useCurrentComponentStore = create<CurrentComponentStore>()(
  devtools(
    (set) => ({
      src: null,
      setSrc: (src) => set(() => ({ src })),
    })
  )
);
