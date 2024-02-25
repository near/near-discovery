import { basic as spaceFiBasic, networks as spaceFiNetworks } from '../dapps/space-fi';
import { basic as velocoreV2Basic, networks as velocoreV2Networks } from '../dapps/velocore-v2';
import { basic as veSyncBasic, networks as veSyncNetworks } from '../dapps/ve-sync';
import { basic as syncSwapBasic, networks as syncSwapNetworks } from '../dapps/sync-swap';
import { basic as zkSwapBasic, networks as zkSwapNetworks } from '../dapps/zk-swap';

const CHAIN_ID = 324;

export default {
  chainId: CHAIN_ID,
  chainName: 'zkSync',
  displayChainName: 'zkSync',
  wethAddress: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
  connectProps: {
    noAccountTips: 'zkSync Swap Collection',
    wrongNetworkTips: 'To proceed, kindly switch to zkSync Chain.',
  },
  defalutDex: 'SpaceFi',
  dexs: {
    SpaceFi: {
      ...spaceFiBasic,
      ...spaceFiNetworks[CHAIN_ID],
    },
    'Velocore V2': {
      ...velocoreV2Basic,
      ...velocoreV2Networks[CHAIN_ID],
    },
    veSync: {
      ...veSyncBasic,
      ...veSyncNetworks[CHAIN_ID],
    },
    SyncSwap: {
      ...syncSwapBasic,
      ...syncSwapNetworks[CHAIN_ID],
    },
    'zkSwap Finance': {
      ...zkSwapBasic,
      ...zkSwapNetworks[CHAIN_ID],
    },
  },
};
