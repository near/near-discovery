import { Token } from '@/components/Bridge/types';
import { metis } from '@/config/tokens/metis';

export const metisTokens = {
  '0x420000000000000000000000000000000000000A': metis.eth,
  '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC': metis.usdt,
} as { [key: string]: Token };
