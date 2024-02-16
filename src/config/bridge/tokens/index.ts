import { arbitrumTokens } from './arbitrum';
import { avalancheTokens } from './avalanche';
import { baseTokens } from './base';
import { bscTokens } from './bsc';
import { ethereumTokens } from './ethereum';
import { lineaTokens } from './linea';
import { metisTokens } from './metis';
import { optimismTokens } from './optimism';
import { polygonTokens } from './polygon';
import { zkSyncTokens } from './zkSync';

export const tokens = {
  ...baseTokens,
  ...ethereumTokens,
  ...arbitrumTokens,
  ...avalancheTokens,
  ...bscTokens,
  ...lineaTokens,
  ...metisTokens,
  ...optimismTokens,
  ...polygonTokens,
  ...zkSyncTokens,
};
