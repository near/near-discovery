import type { Token } from '@/types';

const CHAIN_ID = 43114;
export const avalanche: { [key: string]: Token } = {
  usdc: {
    chainId: CHAIN_ID,
    address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6,
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    name: 'USDT',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 6,
  },
  frax: {
    chainId: CHAIN_ID,
    address: '0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64',
    name: 'Frax',
    symbol: 'FRAX',
    icon: 'https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png?1696513182',
    decimals: 18,
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: 'https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916',
    decimals: 18,
  },
  avax: {
    chainId: CHAIN_ID,
    name: 'AVAX',
    symbol: 'AVAX',
    icon: 'https://assets.dapdap.net/images/bafkreiaxodsgromeeaihu44fazsxdopkrqvinqzhyfxvx5mrbcmduqdfpq.svg',
    decimals: 18,
    isNative: true,
  },
  eth: {
    chainId: CHAIN_ID,
    address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    name: 'Wrapped Ether',
    symbol: 'WETH.e',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
  },
};
