import { Token } from '@/components/Bridge/types';

const CHAIN_ID = 56;
export const bscTokens = {
  '0x55d398326f99059fF775485246999027B3197955': {
    chainId: CHAIN_ID,
    address: '0x55d398326f99059fF775485246999027B3197955',
    name: 'USDT',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 18,
    poolId: 2,
  },
  '0xd17479997F34dd9156Deef8F95A52D81D265be9c': {
    chainId: CHAIN_ID,
    address: '0xd17479997F34dd9156Deef8F95A52D81D265be9c',
    name: 'Decentralized USD',
    symbol: 'USDD',
    icon: 'https://assets.coingecko.com/coins/images/25380/standard/UUSD.jpg?1696524513',
    decimals: 18,
    poolId: 11,
  },
  '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d': {
    chainId: CHAIN_ID,
    address: '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: 'https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916',
    decimals: 18,
    poolId: 16,
  },
} as { [key: string]: Token };
