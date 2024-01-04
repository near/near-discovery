import { basic as velodromeV1Basic, networks as velodromeV1Networks } from '../dapps/velodrome-v1';

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
  },
};
