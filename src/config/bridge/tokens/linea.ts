import { Token } from '@/components/Bridge/types';

const CHAIN_ID = 59144;
export const lineaTokens = {
  '0x224d8fd7ab6ad4c6eb4611ce56ef35dec2277f03': {
    chainId: CHAIN_ID,
    address: '0x224d8fd7ab6ad4c6eb4611ce56ef35dec2277f03',
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
    poolId: 13,
    isNative: true,
  },
} as { [key: string]: Token };
