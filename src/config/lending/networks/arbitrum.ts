import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import radiant from '../dapps/radiant';
import granaryFinance from '../dapps/granary-finance';
import cream from '../dapps/cream';

const CHAIN_ID = 42161;
const CHAIN_NAME = 'Arbitrum';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[42161],
  wethAddress: weth[42161],
  connectProps: {
    noAccountTips: `${CHAIN_NAME} Lending Collection`,
    wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'Radiant',
  dapps: {
    Radiant: {
      ...radiant.basic,
      ...radiant.networks[CHAIN_ID],
    },
    'Granary Finance': {
      ...granaryFinance.basic,
      ...granaryFinance.networks[CHAIN_ID],
    },
    'C.R.E.A.M.': {
      ...cream.basic,
      ...cream.networks[CHAIN_ID],
    },
  },
};
