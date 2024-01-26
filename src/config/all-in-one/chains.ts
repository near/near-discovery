import manta from './chains/manta';
import optimism from './chains/optimism';
import bsc from './chains/bsc';
import gnosis from './chains/gnosis';
import polygon from './chains/polygon';
import zksync from './chains/zksync';
import metis from './chains/metis';
import polygonZkevm from './chains/polygon-zkevm';
import mantle from './chains/mantle';
import base from './chains/base';
import arbitrum from './chains/arbitrum';
import avalanche from './chains/avalanche';
import linea from './chains/linea';
import scroll from './chains/scroll';

const popupsData: {
  [key: string]: {
    title: string;
    path: string;
    icon: string;
    bgColor: string;
    selectBgColor: string;
    chainId: number;
    rpcUrls: string[];
    menuConfig: any;
    defaultTab?: any;
    bgIcon?: string;
  };
} = {
  optimism,
  bsc,
  gnosis,
  polygon,
  zksync,
  metis,
  'polygon-zkevm': polygonZkevm,
  mantle,
  base,
  arbitrum,
  avalanche,
  linea,
  manta,
  scroll,
};

export default popupsData;
