import type { Token } from '@/types';

const CHAIN_ID = 324;
export const zkSync: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
    isNative: true,
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6,
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0x493257fd37edb34451f62edf8d2a0c418852ba4c',
    name: 'Tether USD',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 6,
  },
  lusd: {
    chainId: CHAIN_ID,
    address: '0x503234F203fC7Eb888EEC8513210612a43Cf6115',
    decimals: 18,
    symbol: 'LUSD',
    name: 'LUSD Stablecoin',
    icon: 'https://ipfs.near.social/ipfs/bafkreihbwhrsi447phga5fya4eb4nprudswmh4n5togvpyy4gowntcei5e',
  },
};
