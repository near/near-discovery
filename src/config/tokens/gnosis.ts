import type { Token } from '@/types';

const CHAIN_ID = 100;
export const gnosis: { [key: string]: Token } = {
  xdai: {
    chainId: CHAIN_ID,
    name: 'XDAI',
    symbol: 'XDAI',
    icon: 'https://assets.dapdap.net/images/bafkreieu6n7cav63nwjj5klcsxrk26eo5pqkc4u7xzfle2bjgi5ijm7ipe.webp',
    decimals: 18,
    isNative: true,
  },
};
