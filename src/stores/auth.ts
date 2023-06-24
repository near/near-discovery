import type Big from 'big.js';
import { create } from 'zustand';

type AuthState = {
  account: any;
  accountId: string;
  availableStorage: Big | null;
  logOut: () => Promise<void>;
  refreshAllowance: () => Promise<void>;
  requestSignIn: (redirect?: string) => void;
  requestSignInWithWallet: (event: any) => void;
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
  requestSignIn: () => undefined,
  requestSignInWithWallet: () => undefined,
  signedIn: false,
  set: (state) => set((previousState) => ({ ...previousState, ...state })),
}));
