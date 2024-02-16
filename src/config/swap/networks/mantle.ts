import { basic as agniBasic, networks as agniNetworks } from '../dapps/agni-finance';
import { basic as fusionV3Basic, networks as fusionV3Networks } from '../dapps/fusion-v3';
import { basic as iziSwapBasic, networks as iziSwapNetworks } from '../dapps/izi-swap';
import { basic as ammosBasic, networks as ammosNetworks } from '../dapps/ammos-finance';
import { basic as merchantMoeBasic, networks as merchantMoeNetworks } from '../dapps/merchant-moe';
import { basic as cleopatraBasic, networks as cleopatraNetworks } from '../dapps/cleopatra-exchange';
import { basic as velocimeterV2Basic, networks as velocimeterV2Networks } from '../dapps/velocimeter-v2';

const CHAIN_ID = 5000;

export default {
  chainId: CHAIN_ID,
  chainName: 'Mantle',
  displayChainName: 'Mantle',
  wethAddress: '0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8',
  connectProps: {
    noAccountTips: 'Mantle Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Mantle Chain.',
  },
  defalutDex: 'Agni Finance',
  dexs: {
    'Agni Finance': {
      ...agniBasic,
      ...agniNetworks[CHAIN_ID],
    },
    'FusionX V3': {
      ...fusionV3Basic,
      ...fusionV3Networks[CHAIN_ID],
    },
    iZiSwap: {
      ...iziSwapBasic,
      ...iziSwapNetworks[CHAIN_ID],
    },
    'Ammos Finance': {
      ...ammosBasic,
      ...ammosNetworks[CHAIN_ID],
    },
    'Merchant Moe': {
      ...merchantMoeBasic,
      ...merchantMoeNetworks[CHAIN_ID],
    },
    'Cleopatra Exchange': {
      ...cleopatraBasic,
      ...cleopatraNetworks[CHAIN_ID],
    },
    'Velocimeter V2': {
      ...velocimeterV2Basic,
      ...velocimeterV2Networks[CHAIN_ID],
    },
  },
};
