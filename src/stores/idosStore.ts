import type { idOS } from '@idos-network/idos-sdk';
import { create } from 'zustand';

import type { IdosUser, IdosWalletInfo } from '@/utils/types';

type IdosState = {
  idOS?: idOS;
  currentUser?: IdosUser;
  credentials?: object[];
  wallets?: IdosWalletInfo[];
};

type IdosStore = IdosState & {
  set: (state: IdosState) => void;
};

export const useIdosStore = create<IdosStore>((set) => ({
  idOS: undefined,
  currentUser: undefined,
  credentials: undefined,
  wallets: undefined,
  set: (state) => set((previousState) => ({ ...previousState, ...state })),
}));
