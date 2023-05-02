import { create } from 'zustand';

type EthersProviderStore = {
  Provider: any;
  context: any;
  Widget: any;
  setEthersProvider: (update: { Provider: any; context: any; Widget: any }) => void;
};

export const useEthersProviderStore = create<EthersProviderStore>((set) => ({
  Provider: null,
  context: null,
  Widget: null,
  setEthersProvider: (params) => set(() => ({ ...params })),
}));
