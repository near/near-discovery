import { Token } from '@/components/Bridge/types';
import { linea } from '@/config/tokens/linea';

export const lineaTokens = {
  native: linea.eth,
} as { [key: string]: Token };
