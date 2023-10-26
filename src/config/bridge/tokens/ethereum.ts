import { Token } from '@/components/Bridge/types';

const CHAIN_ID = 1;
export const ethereumTokens = {
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
    chainId: CHAIN_ID,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6,
    poolId: 1,
  },
  '0x72E2F4830b9E45d52F80aC08CB2bEC0FeF72eD9c': {
    chainId: CHAIN_ID,
    address: '0x72E2F4830b9E45d52F80aC08CB2bEC0FeF72eD9c',
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
    poolId: 13,
    isNative: true,
  },
} as { [key: string]: Token };
