import { Token } from '@/components/Bridge/types';

const CHAIN_ID = 137;

export const polygonTokens = {
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': {
    chainId: CHAIN_ID,
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6,
    poolId: 1,
  },
  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': {
    chainId: CHAIN_ID,
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    name: 'USDT',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 6,
    poolId: 2,
  },
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063': {
    chainId: CHAIN_ID,
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    icon: 'https://assets.coingecko.com/coins/images/9956/standard/Badge_Dai.png?1696509996',
    decimals: 18,
    poolId: 3,
  },
  '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1': {
    chainId: CHAIN_ID,
    address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: 'https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916',
    decimals: 18,
    poolId: 16,
  },
} as { [key: string]: Token };
