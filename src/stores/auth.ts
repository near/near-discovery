import type Big from 'big.js';
import { create } from 'zustand';

type AuthState = {
  account: any;
  accountId: string;
  availableStorage: Big | null;
  logOut: () => Promise<void>;
  refreshAllowance: () => Promise<void>;
  requestCreateAccount: () => void;
  requestSignIn: () => void;
  requestSignInWithWallet: () => void;
  signedIn: boolean;
};

type AuthStore = AuthState & {
  set: (state: AuthState) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  account: null,
  accountId: '',
  availableStorage: null,
  logOut: async () => undefined,
  refreshAllowance: async () => undefined,
  requestCreateAccount: () => undefined,
  requestSignIn: () => undefined,
  requestSignInWithWallet: () => undefined,
  signedIn: false,
  set: (state) => set((previousState) => ({ ...previousState, ...state })),
}));
