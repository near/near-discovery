import { basic as quickSwapBasic, networks as quickSwapNetworks } from '../dapps/quick-swap';
import { basic as balancerBasic, networks as balancerNetworks } from '../dapps/balancer';
import { basic as pancakeSwapBasic, networks as pancakeSwapNetworks } from '../dapps/pancake-swap';

const CHAIN_ID = 1101;

export default {
  chainId: CHAIN_ID,
  chainName: 'Polygon zkEVM',
  displayChainName: 'Polygon zkEVM',
  wethAddress: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
  connectProps: {
    noAccountTips: 'Polygon zkEVM Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Polygon zkEVM Chain.',
  },
  defalutDex: 'QuickSwap',
  dexs: {
    QuickSwap: {
      ...quickSwapBasic,
      ...quickSwapNetworks[CHAIN_ID],
    },
    Balancer: {
      ...balancerBasic,
      ...balancerNetworks[CHAIN_ID],
    },
    'Pancake Swap': {
      ...pancakeSwapBasic,
      ...pancakeSwapNetworks[CHAIN_ID],
    },
  },
};
