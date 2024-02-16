import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import lendle from '../dapps/lendle';

const CHAIN_ID = 5000;
const CHAIN_NAME = 'Mantle';

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
  defaultDapp: 'Lendle',
  dapps: {
    Lendle: {
      ...lendle.basic,
      ...lendle.networks[CHAIN_ID],
    },
  },
};
