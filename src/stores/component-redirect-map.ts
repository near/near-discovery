import { create } from 'zustand';

type ComponentRedirectMapState = {
  failedToLoad: boolean;
  hasResolved: boolean;
  loaderUrl: string;
  redirectMap: Record<string, unknown>;
};

type ComponentRedirectMapStore = ComponentRedirectMapState & {
  set: (state: Partial<ComponentRedirectMapState>) => void;
};

export const useComponentRedirectMapStore = create<ComponentRedirectMapStore>((set) => ({
  failedToLoad: false,
  hasResolved: false,
  loaderUrl: '',
  redirectMap: {},
  set: (state) => set((previousState) => ({ ...previousState, ...state })),
}));
