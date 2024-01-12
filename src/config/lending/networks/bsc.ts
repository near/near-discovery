import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import venus from '../dapps/venus';
import cream from '../dapps/cream';
import radiant from '../dapps/radiant';
import granary from '../dapps/granary-finance';

const CHAIN_ID = 56;
const CHAIN_NAME = 'BSC';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'BSC Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to BSC Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'Granary Finance',
  dapps: {
    Venus: {
      ...venus.basic,
      ...venus.networks[CHAIN_ID],
    },
    'C.R.E.A.M.': {
      ...cream.basic,
      ...cream.networks[CHAIN_ID],
    },
    Radiant: {
      ...radiant.basic,
      ...radiant.networks[CHAIN_ID],
    },
    'Granary Finance': {
      ...granary.basic,
      ...granary.networks[CHAIN_ID],
    },
  },
};
