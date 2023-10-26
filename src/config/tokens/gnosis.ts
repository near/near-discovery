import { Token } from '@/types';

const CHAIN_ID = 100;
export const gnosis: { [key: string]: Token } = {
  xdai: {
    chainId: CHAIN_ID,
    name: 'XDAI',
    symbol: 'XDAI',
    icon: 'https://ipfs.near.social/ipfs/bafkreieu6n7cav63nwjj5klcsxrk26eo5pqkc4u7xzfle2bjgi5ijm7ipe',
    decimals: 18,
    isNative: true,
  },
};
