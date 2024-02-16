import { basic as velodromeV1Basic, networks as velodromeV1Networks } from '../dapps/velodrome-v1';
import { basic as sushiBasic, networks as sushiNetworks } from '../dapps/sushi-swap';
import { basic as beethovenBasic, networks as beethovenNetworks } from '../dapps/beethoven-x';
import { basic as fraxBasic, networks as fraxNetworks } from '../dapps/frax-swap';
import { basic as velodromeBasic, networks as velodromeNetworks } from '../dapps/velodrome-v2';

const CHAIN_ID = 10;

export default {
  chainId: CHAIN_ID,
  chainName: 'Optimism',
  displayChainName: 'Optimism',
  wethAddress: '0x4200000000000000000000000000000000000006',
  connectProps: {
    noAccountTips: 'Optimism Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Optimism Chain.',
  },
  defalutDex: 'Velodrome V1',
  dexs: {
    'Velodrome V1': {
      ...velodromeV1Basic,
      ...velodromeV1Networks[CHAIN_ID],
    },
    SushiSwap: {
      ...sushiBasic,
      ...sushiNetworks[CHAIN_ID],
    },
    'Beethoven X': {
      ...beethovenBasic,
      ...beethovenNetworks[CHAIN_ID],
    },
    'Frax Swap': {
      ...fraxBasic,
      ...fraxNetworks[CHAIN_ID],
    },
    'Velodrome V2': {
      ...velodromeBasic,
      ...velodromeNetworks[CHAIN_ID],
    },
  },
};
