import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type BosLoaderState = {
  failedToLoad: boolean;
  hasResolved: boolean;
  loaderUrl: string;
  redirectMap: Record<string, unknown>;
};

type BosLoaderStore = BosLoaderState & {
  set: (state: Partial<BosLoaderState>) => void;
};

export const useBosLoaderStore = create<BosLoaderStore>()(
  devtools(
    (set) => ({
      failedToLoad: false,
      hasResolved: false,
      loaderUrl: '',
      redirectMap: {},
      set: (state) => set((previousState) => ({ ...previousState, ...state })),
    })
  )
);
