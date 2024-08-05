import { create } from 'zustand';

export type CookieDataState = {
  cookieData: boolean;
  set: (state: Partial<CookieDataState>) => void;
  checkCookieData: () => void;
};

type CookieDataStore = CookieDataState & {
  set: (state: Partial<CookieDataState>) => void;
  checkCookieData: () => void;
};

export const useCookieStore = create<CookieDataStore>((set) => ({
  cookieData: false,
  set: (state: Partial<CookieDataState>) =>
    set((previousState: Partial<CookieDataState>) => ({ ...previousState, ...state })),
  checkCookieData: () => {
    const cookiesAcknowledged = !!localStorage.getItem('cookiesAcknowledged') || false;
    set({ cookieData: cookiesAcknowledged });
  },
}));
