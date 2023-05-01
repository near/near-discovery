import type Big from 'big.js';
import { create } from 'zustand';

type AuthState = {
  accountId: string;
  availableStorage: Big | null;
  logOut: () => Promise<void>;
  refreshAllowance: () => Promise<void>;
  requestSignIn: () => void;
  requestSignInWithWallet: (event: any) => void;
  signedIn: boolean;
};

type AuthStore = AuthState & {
  update: (state: AuthState) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  accountId: '',
  availableStorage: null,
  logOut: async () => undefined,
  refreshAllowance: async () => undefined,
  requestSignIn: () => undefined,
  requestSignInWithWallet: () => undefined,
  signedIn: false,
  update: (state) => set((previousState) => ({ ...previousState, ...state })),
}));
