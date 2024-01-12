import type { idOS } from '@idos-network/idos-sdk';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { IdosUser, IdosWalletInfo } from '@/utils/types';

type IdosTypeTemp = idOS & { setSigner(signer: string, wallet: any): void };

type IdosState = {
  idOS?: IdosTypeTemp;
  currentUser?: IdosUser;
  hasProfile?: boolean;
  connectedWallet?: string;
  credentials?: object[];
  wallets?: IdosWalletInfo[];
};

type IdosStore = IdosState & {
  set: (state: IdosState) => void;
};

export const useIdosStore = create(
  persist(
    (set) => ({
      idOS: undefined,
      currentUser: undefined,
      hasProfile: false,
      connectedWallet: undefined,
      credentials: undefined,
      wallets: undefined,
      set: (state) => set((previousState) => ({ ...previousState, ...state })),
    }),
    {
      name: 'idOS-user-info',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: IdosStore) =>
        Object.fromEntries(Object.entries(state).filter(([key]) => !['idOS'].includes(key))),
    },
  ),
);
