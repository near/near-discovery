import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import agave from '../dapps/agave';

const CHAIN_ID = 100;
const CHAIN_NAME = 'Gnosis';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: `${CHAIN_NAME} Lending Collection`,
    wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'Agave',
  dapps: {
    Agave: {
      ...agave.basic,
      ...agave.networks[CHAIN_ID],
    },
  },
};
