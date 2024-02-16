import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import reactorFusion from '../dapps/reactor-fusion';

const CHAIN_ID = 324;
const CHAIN_NAME = 'zkSync';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'zkSync Swap Collection',
    wrongNetworkTips: 'To proceed, kindly switch to zkSync Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'Reactorfusion',
  dapps: {
    Reactorfusion: {
      ...reactorFusion.basic,
      ...reactorFusion.networks[CHAIN_ID],
    },
  },
};
