import arbitrum from './arbitrum';
import avalanche from './avalanche';
import base from './base';
import bsc from './bsc';
import gnosis from './gnosis';
import linea from './linea';
import mantle from './mantle';
import metis from './metis';
import optimism from './optimism';
import polygon from './polygon';
import zkSync from './zkSync';
import polygonZkevm from './polygon-zkevm';

export default {
  42161: arbitrum,
  43114: avalanche,
  8453: base,
  56: bsc,
  100: gnosis,
  59144: linea,
  5000: mantle,
  1088: metis,
  10: optimism,
  137: polygon,
  324: zkSync,
  1101: polygonZkevm,
} as { [key: number]: any };
