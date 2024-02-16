import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import layerBank from '../dapps/layer-bank';
import shoebillV2 from '../dapps/shoebill-v2';

const CHAIN_ID = 169;
const CHAIN_NAME = 'Manta';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Manta Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Manta Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'LayerBank',
  dapps: {
    LayerBank: {
      ...layerBank.basic,
      ...layerBank.networks[CHAIN_ID],
    },
    'Shoebill V2': {
      ...shoebillV2.basic,
      ...shoebillV2.networks[CHAIN_ID],
    },
  },
};
