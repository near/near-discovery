import { Token } from '@/types';

const CHAIN_ID = 137;
export const polygon: { [key: string]: Token } = {
  matic: {
    chainId: CHAIN_ID,
    name: 'MATIC',
    symbol: 'MATIC',
    icon: 'https://ipfs.near.social/ipfs/bafkreih5yowurclpyrr5bwzonh76ywld22riv4mjp2scne6ye7746dcjl4',
    decimals: 18,
    isNative: true,
  },
  eth: {
    chainId: CHAIN_ID,
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6,
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    name: 'USDT',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 6,
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    icon: 'https://assets.coingecko.com/coins/images/9956/standard/Badge_Dai.png?1696509996',
    decimals: 18,
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: 'https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916',
    decimals: 18,
  },
};
