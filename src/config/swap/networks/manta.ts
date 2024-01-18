import { basic as apertureBasic, networks as apertureNetworks } from '../dapps/aperture-swap';
import { basic as quickSwapBasic, networks as quickSwapNetworks } from '../dapps/quick-swap';

const CHAIN_ID = 169;

export default {
  chainId: CHAIN_ID,
  chainName: 'Manta',
  displayChainName: 'Manta',
  wethAddress: '0x0Dc808adcE2099A9F62AA87D9670745AbA741746',
  connectProps: {
    noAccountTips: 'Manta Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Manta Chain.',
  },
  defalutDex: 'QuickSwap',
  dexs: {
    QuickSwap: {
      ...quickSwapBasic,
      ...quickSwapNetworks[CHAIN_ID],
    },
    ApertureSwap: {
      ...apertureBasic,
      ...apertureNetworks[CHAIN_ID],
    },
  },
};
