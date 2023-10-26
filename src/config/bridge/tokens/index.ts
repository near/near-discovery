import { baseTokens } from './base';
import { ethereumTokens } from './ethereum';
import { arbitrumTokens } from './arbitrum';
import { avalancheTokens } from './avalanche';
import { bscTokens } from './bsc';
import { lineaTokens } from './linea';
import { metisTokens } from './metis';
import { optimismTokens } from './optimism';
import { polygonTokens } from './polygon';

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
};
