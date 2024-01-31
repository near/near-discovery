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

export const PathToId: { [key: string]: number } = {
  optimism: 13,
  bsc: 12,
  gnosis: 11,
  polygon: 10,
  zksync: 9,
  metis: 8,
  'polygon-zkevm': 3,
  mantle: 7,
  base: 6,
  arbitrum: 2,
  avalanche: 5,
  linea: 4,
  manta: 15,
  scroll: 17,
};

export const IdToPath: { [key: string]: string } = {
  13: 'optimism',
  12: 'bsc',
  11: 'gnosis',
  10: 'polygon',
  9: 'zksync',
  8: 'metis',
  3: 'polygon-zkevm',
  7: 'mantle',
  6: 'base',
  2: 'arbitrum',
  5: 'avalanche',
  4: 'linea',
  15: 'manta',
  17: 'scroll',
};

export default popupsData;
