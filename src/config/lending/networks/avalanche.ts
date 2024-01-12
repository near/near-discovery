import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import benqi from '../dapps/benqi';
import granary from '../dapps/granary-finance';
import ironBank from '../dapps/iron-bank';

const CHAIN_ID = 43114;
const CHAIN_NAME = 'Avalanche';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    imgProps: {
      src: '',
      style: {
        width: '283px',
        height: '187px',
        marginTop: '60px',
      },
    },
    noAccountTips: 'Avalanche Lending Collection',
    wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'Benqi',
  dapps: {
    Benqi: {
      ...benqi.basic,
      ...benqi.networks[CHAIN_ID],
    },
    'Granary Finance': {
      ...granary.basic,
      ...granary.networks[CHAIN_ID],
    },
    'Iron Bank': {
      ...ironBank.basic,
      ...ironBank.networks[CHAIN_ID],
    },
  },
};
