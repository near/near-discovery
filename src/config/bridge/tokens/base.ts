import type { Token } from '@/components/Bridge/types';
import { base } from '@/config/tokens/base';

export const baseTokens = {
  '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA': {
    ...base.usdc,
    poolId: 1,
  },
  '0x224D8Fd7aB6AD4c6eb4611Ce56EF35Dec2277F03': {
    ...base.eth,
    address: '0x224D8Fd7aB6AD4c6eb4611Ce56EF35Dec2277F03',
    poolId: 13,
  },
} as { [key: string]: Token };
