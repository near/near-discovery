import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import radiant from '../dapps/radiant';
import granaryFinance from '../dapps/granary-finance';
import cream from '../dapps/cream';
import tenderFinance from '../dapps/tender-finance';
import filda from '../dapps/filda';
import wePiggy from '../dapps/we-piggy';
import loadestar from '../dapps/lodestar-v1';

const CHAIN_ID = 42161;
const CHAIN_NAME = 'Arbitrum';

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
  defaultDapp: 'Lodestar V1',
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
    'Tender Finance': {
      ...tenderFinance.basic,
      ...tenderFinance.networks[CHAIN_ID],
    },
    FilDA: {
      ...filda.basic,
      ...filda.networks[CHAIN_ID],
    },
    WePiggy: {
      ...wePiggy.basic,
      ...wePiggy.networks[CHAIN_ID],
    },
    'Lodestar V1': {
      ...loadestar.basic,
      ...loadestar.networks[CHAIN_ID],
    },
  },
};
