import { basic as baseSwapBasic, networks as baseSwapNetworks } from '../dapps/base-swap';
import { basic as rocketSwapBasic, networks as rocketSwapNetworks } from '../dapps/rocket-swap';
import { basic as swapBasedBasic, networks as swapBasedNetworks } from '../dapps/swap-based';
import { basic as synthSwapBasic, networks as synthSwapNetworks } from '../dapps/synth-swap';
import { basic as horizonDexBasic, networks as horizonDexNetworks } from '../dapps/horizon-dex';

const CHAIN_ID = 8453;

export default {
  chainId: CHAIN_ID,
  chainName: 'Base',
  displayChainName: 'BASE',
  wethAddress: '0x4200000000000000000000000000000000000006',
  connectProps: {
    noAccountTips: 'Base Swap Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Base Chain.',
  },
  defalutDex: 'BaseSwap',
  dexs: {
    BaseSwap: {
      ...baseSwapBasic,
      ...baseSwapNetworks[CHAIN_ID],
    },
    RocketSwap: {
      ...rocketSwapBasic,
      ...rocketSwapNetworks[CHAIN_ID],
    },
    SwapBased: {
      ...swapBasedBasic,
      ...swapBasedNetworks[CHAIN_ID],
    },
    Synthswap: {
      ...synthSwapBasic,
      ...synthSwapNetworks[CHAIN_ID],
    },
    HorizonDEX: {
      ...horizonDexBasic,
      ...horizonDexNetworks[CHAIN_ID],
    },
  },
};
