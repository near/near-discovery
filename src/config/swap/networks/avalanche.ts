import { basic as joeTraderBasic, networks as joeTraderNetworks } from '../dapps/trader-joe';
import { basic as pangolinBasic, networks as pangolinNetworks } from '../dapps/pangolin';

const CHAIN_ID = 43114;

export default {
  chainId: CHAIN_ID,
  chainName: 'Avalanche',
  displayChainName: 'Avalanche',
  wethAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  connectProps: {
    noAccountTips: 'Avalanche Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Avalanche Chain.',
  },
  defalutDex: 'Trader Joe',
  dexs: {
    'Trader Joe': {
      ...joeTraderBasic,
      ...joeTraderNetworks[CHAIN_ID],
    },
    Pangolin: {
      ...pangolinBasic,
      ...pangolinNetworks[CHAIN_ID],
    },
  },
};
