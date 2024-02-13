import type { Token } from '@/components/Bridge/types';
import { manta } from '@/config/tokens/manta';

export const mantaTokens = {
  native: manta.eth,
} as { [key: string]: Token };
