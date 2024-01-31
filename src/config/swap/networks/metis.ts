import { basic as maiaBasic, networks as maiaNetworks } from '../dapps/maia-v3';
import { basic as netSwap3Basic, networks as netSwapNetworks } from '../dapps/net-swap';
import { basic as hummusBasic, networks as hummusNetworks } from '../dapps/hummus';

const CHAIN_ID = 1088;

export default {
  chainId: CHAIN_ID,
  chainName: 'Metis',
  displayChainName: 'Metis',
  wethAddress: '0x0000000000000000000000000000000000000000',
  connectProps: {
    noAccountTips: 'Mantle Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Mantle Chain.',
  },
  defalutDex: 'Maia V3',
  dexs: {
    'Maia V3': {
      ...maiaBasic,
      ...maiaNetworks[CHAIN_ID],
    },
    Netswap: {
      ...netSwap3Basic,
      ...netSwapNetworks[CHAIN_ID],
    },
    Hummus: {
      ...hummusBasic,
      ...hummusNetworks[CHAIN_ID],
    },
  },
};
