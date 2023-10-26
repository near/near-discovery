import { create } from 'zustand';

type LayoutState = {
  showAccountSider: boolean;
};

type LayoutStore = LayoutState & {
  set: (update: LayoutState) => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
  showAccountSider: false,
  set: (params) => set(() => ({ ...params })),
}));
