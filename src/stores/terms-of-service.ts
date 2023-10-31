import { create } from 'zustand';

import type { TosData } from '@/utils/types';

type TermsOfServiceStore = {
  tosData: TosData | null;
  setTosData: (tosData: TosData | null) => void;
};

export const useTermsOfServiceStore = create<TermsOfServiceStore>((set, get) => ({
  tosData: null,
  setTosData: (tosData) => {
    const state = get();

    if (!tosData || state.tosData?.latestTosVersion === tosData.latestTosVersion) {
      return;
    }

    set(() => ({ tosData }));
  },
}));
