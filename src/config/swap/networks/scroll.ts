import weths from '../../contract/weth';
import { basic as metavaultV3Basic, networks as metavaultV3Networks } from '../dapps/metavault-v3';
import { basic as skydromeBasic, networks as skydromeNetworks } from '../dapps/skydrome';
import { basic as spaceFiBasic, networks as spaceFiNetworks } from '../dapps/space-fi';
import { basic as ambientBasic, networks as ambientNetworks } from '../dapps/ambient';
import { basic as SyncSwapBasic, networks as SyncSwapNetworks } from '../dapps/sync-swap';
import { basic as zebraBasic, networks as zebraNetworks } from '../dapps/zebra';
import { basic as IziSwapBasic, networks as IziSwapNetworks } from '../dapps/izi-swap';

const CHAIN_ID = 534352;

export default {
  chainId: CHAIN_ID,
  chainName: 'Scroll',
  displayChainName: 'Scroll',
  wethAddress: weths[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Scroll Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Scroll Chain.',
  },
  defalutDex: 'Metavault V3',
  dexs: {
    'Metavault V3': {
      ...metavaultV3Basic,
      ...metavaultV3Networks[CHAIN_ID],
    },
    Skydrome: {
      ...skydromeBasic,
      ...skydromeNetworks[CHAIN_ID],
    },
    SpaceFi: {
      ...spaceFiBasic,
      ...spaceFiNetworks[CHAIN_ID],
    },
    Ambient: {
      ...ambientBasic,
      ...ambientNetworks[CHAIN_ID],
    },
    Syncswap: {
      ...SyncSwapBasic,
      ...SyncSwapNetworks[CHAIN_ID],
    },
    Zebra: {
      ...zebraBasic,
      ...zebraNetworks[CHAIN_ID],
    },
    iZiSwap: {
      ...IziSwapBasic,
      ...IziSwapNetworks[CHAIN_ID],
    },
  },
};
