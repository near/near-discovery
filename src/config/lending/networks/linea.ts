import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import layerBank from '../dapps/layer-bank';
import mendi from '../dapps/mendi-finance';

const CHAIN_ID = 59144;
const CHAIN_NAME = 'Linea';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Linea Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Linea Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'LayerBank',
  dapps: {
    LayerBank: {
      ...layerBank.basic,
      ...layerBank.networks[CHAIN_ID],
    },
    'mendi finance': {
      ...mendi.basic,
      ...mendi.networks[CHAIN_ID],
    },
  },
};
