import { basic as baseSwapBasic, networks as baseSwapNetworks } from '../dapps/base-swap';
import { basic as rocketSwapBasic, networks as rocketSwapNetworks } from '../dapps/rocket-swap';
import { basic as swapBasedBasic, networks as swapBasedNetworks } from '../dapps/swap-based';
import { basic as synthSwapBasic, networks as synthSwapNetworks } from '../dapps/synth-swap';
import { basic as horizonDexBasic, networks as horizonDexNetworks } from '../dapps/horizon-dex';
import { basic as sharkBasic, networks as sharkNetworks } from '../dapps/shark-swap';
import { basic as aerodromeBasic, networks as aerodromeNetworks } from '../dapps/aerodrome';
import { basic as sobalBasic, networks as sobalNetworks } from '../dapps/sobal';
import { basic as velocimeterV2Basic, networks as velocimeterV2Networks } from '../dapps/velocimeter-v2';

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
    SharkSwap: {
      ...sharkBasic,
      ...sharkNetworks[CHAIN_ID],
    },
    Aerodrome: {
      ...aerodromeBasic,
      ...aerodromeNetworks[CHAIN_ID],
    },
    Sobal: {
      ...sobalBasic,
      ...sobalNetworks[CHAIN_ID],
    },
    'Velocimeter V2': {
      ...velocimeterV2Basic,
      ...velocimeterV2Networks[CHAIN_ID],
    },
  },
};
