import { baseTokens } from './base';
import { ethereumTokens } from './ethereum';
import { arbitrumTokens } from './arbitrum';
import { avalancheTokens } from './avalanche';
import { bscTokens } from './bsc';
import { lineaTokens } from './linea';
import { metisTokens } from './metis';
import { optimismTokens } from './optimism';
import { polygonTokens } from './polygon';
import { gnosisTokens } from './gnosis';
import { polygonZkevmTokens } from './polygonZkevm';
import { zkSyncTokens } from './zkSync';
import { mantleTokens } from './mantle';
import { Token } from '@/types';

export default {
  42161: arbitrumTokens,
  8453: baseTokens,
  1: ethereumTokens,
  43114: avalancheTokens,
  56: bscTokens,
  59144: lineaTokens,
  1088: metisTokens,
  10: optimismTokens,
  137: polygonTokens,
  100: gnosisTokens,
  1101: polygonZkevmTokens,
  324: zkSyncTokens,
  5000: mantleTokens,
} as { [key: number]: { [key: string]: Token } };
