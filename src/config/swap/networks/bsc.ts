import { basic as biSwapBasic, networks as biSwapNetworks } from '../dapps/bi-swap';
import { basic as apeSwapBasic, networks as apeSwapNetworks } from '../dapps/ape';
import { basic as orionBasic, networks as orionNetworks } from '../dapps/orion';
import { basic as thenaV1Basic, networks as thenaV1Networks } from '../dapps/thena-v1';
import { basic as joeTraderBasic, networks as joeTraderNetworks } from '../dapps/trader-joe';

const CHAIN_ID = 56;

export default {
  chainId: CHAIN_ID,
  chainName: 'BSC',
  displayChainName: 'BSC',
  wethAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  connectProps: {
    noAccountTips: 'BSC Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to BSC Chain.',
  },
  defalutDex: 'Biswap',
  dexs: {
    Biswap: {
      ...biSwapBasic,
      ...biSwapNetworks[CHAIN_ID],
    },
    Apeswap: {
      ...apeSwapBasic,
      ...apeSwapNetworks[CHAIN_ID],
    },
    Orion: {
      ...orionBasic,
      ...orionNetworks[CHAIN_ID],
    },
    'THENA V1': {
      ...thenaV1Basic,
      ...thenaV1Networks[CHAIN_ID],
    },
    'Trader Joe': {
      ...joeTraderBasic,
      ...joeTraderNetworks[CHAIN_ID],
    },
  },
};
