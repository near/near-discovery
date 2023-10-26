import type { Token } from '@/types';

const CHAIN_ID = 5000;
export const mantle: { [key: string]: Token } = {
  mnt: {
    chainId: CHAIN_ID,
    name: 'MNT',
    symbol: 'MNT',
    icon: 'https://assets.coingecko.com/coins/images/30980/small/token-logo.png?1689320029',
    decimals: 18,
    isNative: true,
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6,
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE',
    name: 'USDT',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 6,
  },
};
