import { create } from "zustand";

type AuthState = {
  signedIn: boolean;
};

type AuthStore = AuthState & {
  updateAuth: (updatedState: AuthState) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  signedIn: false,
  updateAuth: (updatedState) => set((state) => ({ ...state, ...updatedState })),
}));
