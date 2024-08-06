import type { Wallet } from '@near-wallet-selector/core';
import type Big from 'big.js';
import { create } from 'zustand';

type AuthState = {
  account: any;
  accountId: string;
  availableStorage: Big | null;
  logOut: () => Promise<void>;
  refreshAllowance: () => Promise<void>;
  requestSignInWithWallet: () => void;
  requestSignMessage: (data: string) => void;
  signedIn: boolean;
  vmNear: any;
  wallet: Wallet | null;
};

type AuthStore = AuthState & {
  set: (state: Omit<AuthState, 'wallet'>) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  account: null,
  accountId: '',
  availableStorage: null,
  logOut: async () => undefined,
  refreshAllowance: async () => undefined,
  requestSignInWithWallet: () => undefined,
  requestSignMessage: () => undefined,
  signedIn: false,
  vmNear: null,
  wallet: null,

  set: async (state) => {
    let wallet: Wallet | null = null;

    try {
      wallet = state.vmNear && state.accountId ? await (await state.vmNear.selector).wallet() : null;
    } catch (error) {
      console.error(error);
    }

    set((previousState) => ({ ...previousState, ...state, wallet }));
  },
}));
