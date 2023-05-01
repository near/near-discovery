import Big from "big.js";
import { create } from "zustand";

type AuthState = {
  accountId: null | string;
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
  accountId: null,
  availableStorage: null,
  logOut: async () => {},
  refreshAllowance: async () => {},
  requestSignIn: () => {},
  requestSignInWithWallet: () => {},
  signedIn: false,
  update: (state) => set((previousState) => ({ ...previousState, ...state })),
}));
