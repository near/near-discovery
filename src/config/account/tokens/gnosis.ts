import type { Token } from '@/components/Bridge/types';
import { gnosis } from '@/config/tokens/gnosis';

export const gnosisTokens = {
  native: gnosis.xdai,
} as { [key: string]: Token };
