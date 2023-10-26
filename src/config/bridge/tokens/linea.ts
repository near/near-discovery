import { Token } from '@/components/Bridge/types';
import { linea } from '@/config/tokens/linea';

export const lineaTokens = {
  '0x224d8fd7ab6ad4c6eb4611ce56ef35dec2277f03': {
    ...linea.eth,
    address: '0x224d8fd7ab6ad4c6eb4611ce56ef35dec2277f03',
    poolId: 13,
  },
} as { [key: string]: Token };
