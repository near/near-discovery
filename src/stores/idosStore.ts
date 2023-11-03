import type { idOS } from '@idos-network/idos-sdk';
import { create } from 'zustand';

type IdosStore = {
  idOS: idOS | null;
  set: (state: IdosStore) => void;
  currentUser: object | null;
};

export const useIdosStore = create<IdosStore>((set) => ({
  set: (state) => set((previousState) => ({ ...previousState, ...state })),
  idOS: null,
  currentUser: null,
}));
