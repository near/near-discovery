import { create } from 'zustand';

type VmState = {
  ethersContext: any;
  EthersProvider: any;
  Widget: any;
  near: any;
};

type VmStore = VmState & {
  set: (update: VmState) => void;
};

export const useVmStore = create<VmStore>((set) => ({
  ethersContext: null,
  EthersProvider: null,
  Widget: null,
  near: null,
  set: (params) => set(() => ({ ...params })),
}));
