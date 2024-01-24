import weths from '../../contract/weth';
import { basic as metavaultV3Basic, networks as metavaultV3Networks } from '../dapps/metavault-v3';

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
  },
};
