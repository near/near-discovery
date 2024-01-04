import { basic as honeySwapBasic, networks as honeySwapNetworks } from '../dapps/honey-swap';

const CHAIN_ID = 100;

export default {
  chainId: CHAIN_ID,
  chainName: 'Gnosis',
  displayChainName: 'Gnosis',
  wethAddress: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  connectProps: {
    noAccountTips: 'Gnosis Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Gnosis Chain.',
  },
  defalutDex: 'Honeyswap',
  dexs: {
    Honeyswap: {
      ...honeySwapBasic,
      ...honeySwapNetworks[CHAIN_ID],
    },
  },
};
