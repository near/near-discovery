import { Token } from '@/components/Bridge/types';

const CHAIN_ID = 42161;
export const arbitrumTokens = {
  '0x82CbeCF39bEe528B5476FE6d1550af59a9dB6Fc0': {
    chainId: CHAIN_ID,
    address: '0x82CbeCF39bEe528B5476FE6d1550af59a9dB6Fc0',
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
    poolId: 13,
    isNative: true,
  },
  '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8': {
    chainId: CHAIN_ID,
    address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6,
    poolId: 1,
  },
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9': {
    chainId: CHAIN_ID,
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    name: 'USDT',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 6,
    poolId: 2,
  },
  '0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F': {
    chainId: CHAIN_ID,
    address: '0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F',
    name: 'Frax',
    symbol: 'FRAX',
    icon: 'https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png?1696513182',
    decimals: 18,
    poolId: 7,
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
  '0x93b346b6BC2548dA6A1E7d98E9a421B42541425b': {
    chainId: CHAIN_ID,
    address: '0x93b346b6BC2548dA6A1E7d98E9a421B42541425b',
    name: 'LUSD Stablecoin',
    symbol: 'LUSD',
    icon: 'https://assets.coingecko.com/coins/images/14666/standard/Group_3.png?1696514341',
    decimals: 18,
    poolId: 15,
  },
} as { [key: string]: Token };
