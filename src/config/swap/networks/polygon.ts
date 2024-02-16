import { basic as retroBasic, networks as retroNetworks } from '../dapps/retro';
import { basic as apeBasic, networks as apeNetworks } from '../dapps/ape';
import { basic as honeyBasic, networks as honeyNetworks } from '../dapps/honey-swap';
import { basic as quickSwapBasic, networks as quickSwapNetworks } from '../dapps/quick-swap';
import { basic as pearlFiBasic, networks as pearlFiNetworks } from '../dapps/pearl-fi';
import { basic as sushiBasic, networks as sushiNetworks } from '../dapps/sushi-swap';

const CHAIN_ID = 137;

export default {
  chainId: CHAIN_ID,
  chainName: 'Polygon',
  displayChainName: 'Polygon',
  wethAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  connectProps: {
    noAccountTips: 'Polygon Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Polygon Chain.',
  },
  defalutDex: 'Retro',
  dexs: {
    Retro: {
      ...retroBasic,
      ...retroNetworks[CHAIN_ID],
    },
    Apeswap: {
      ...apeBasic,
      ...apeNetworks[CHAIN_ID],
    },
    Honeyswap: {
      ...honeyBasic,
      ...honeyNetworks[CHAIN_ID],
    },
    QuickSwap: {
      ...quickSwapBasic,
      ...quickSwapNetworks[CHAIN_ID],
    },
    PearlFi: {
      ...pearlFiBasic,
      ...pearlFiNetworks[CHAIN_ID],
    },
    SushiSwap: {
      ...sushiBasic,
      ...sushiNetworks[CHAIN_ID],
    },
  },
};
