import type { Token } from '@/types';

const CHAIN_ID = 1101;
export const polygonZkevm: { [key: string]: Token } = {
  matic: {
    chainId: CHAIN_ID,
    address: '0xa2036f0538221a77A3937F1379699f44945018d0',
    name: 'MATIC',
    symbol: 'MATIC',
    icon: 'https://ipfs.near.social/ipfs/bafkreih5yowurclpyrr5bwzonh76ywld22riv4mjp2scne6ye7746dcjl4',
    decimals: 18,
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6,
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
    name: 'USDT',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 6,
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    icon: 'https://assets.coingecko.com/coins/images/9956/standard/Badge_Dai.png?1696509996',
    decimals: 18,
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0x27a4BF80C2d63E42437258533dac7eAFF9881bdB',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: 'https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916',
    decimals: 18,
  },
};
