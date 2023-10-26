import type { Token } from '@/components/Bridge/types';
import { base } from '@/config/tokens/base';

export const baseTokens = {
  native: base.eth,
  '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA': base.usdc,
} as { [key: string]: Token };
