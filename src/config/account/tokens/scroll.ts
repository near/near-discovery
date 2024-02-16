import type { Token } from '@/components/Bridge/types';
import { scroll } from '@/config/tokens/scroll';

export const scrollTokens = {
  native: scroll.eth,
} as { [key: string]: Token };
