import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type VmState = {
  cache: any;
  CommitButton: any;
  ethersContext: any;
  EthersProvider: any;
  Widget: any;
  near: any;
};

type VmStore = VmState & {
  set: (update: VmState) => void;
};

export const useVmStore = create<VmStore>()(
  devtools(
    (set) => ({
      cache: null,
      CommitButton: null,
      ethersContext: null,
      EthersProvider: null,
      Widget: null,
      near: null,
      set: (params) => set(() => ({ ...params })),
    }),
    {name: 'vm'}
  )
);
