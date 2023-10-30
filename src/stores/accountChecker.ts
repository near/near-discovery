import { create } from 'zustand';

type AccountCheckerState = {
  accounts: { [key: string]: boolean };
};

type AccountCheckerStore = AccountCheckerState & {
  set: (update: AccountCheckerState) => void;
};

export const useAccountCheckerStore = create<AccountCheckerStore>((set) => ({
  accounts: {},
  set: (params) => set(() => ({ ...params })),
}));
