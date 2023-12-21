import type { Token } from '@/types';

const CHAIN_ID = 324;
export const zkSync: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    address: '0x0000000000000000000000000000000000000000',
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
    isNative: true,
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
    name: 'WETH',
    symbol: 'WETH',
    icon: 'https://static.debank.com/image/era_token/logo_url/0x5aea5775959fbc2557cc8789bc1bf90a239d9a91/61844453e63cf81301f845d7864236f6.png',
    decimals: 18,
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
    icon: 'https://assets.dapdap.net/images/bafkreihbwhrsi447phga5fya4eb4nprudswmh4n5togvpyy4gowntcei5e.png',
  },
};
