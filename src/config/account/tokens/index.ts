import type { Token } from '@/types';

import { arbitrumTokens } from './arbitrum';
import { avalancheTokens } from './avalanche';
import { baseTokens } from './base';
import { bscTokens } from './bsc';
import { ethereumTokens } from './ethereum';
import { gnosisTokens } from './gnosis';
import { lineaTokens } from './linea';
import { mantleTokens } from './mantle';
import { metisTokens } from './metis';
import { optimismTokens } from './optimism';
import { polygonTokens } from './polygon';
import { polygonZkevmTokens } from './polygonZkevm';
import { zkSyncTokens } from './zkSync';

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
