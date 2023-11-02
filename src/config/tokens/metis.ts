import type { Token } from '@/types';

const CHAIN_ID = 1088;
export const metis: { [key: string]: Token } = {
  usdt: {
    chainId: CHAIN_ID,
    name: 'USDT Token',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 6,
    address: '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC',
  },
  eth: {
    chainId: CHAIN_ID,
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
    address: '0x420000000000000000000000000000000000000A',
  },
  metis: {
    chainId: CHAIN_ID,
    address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    decimals: 18,
    symbol: 'METIS',
    name: 'Metis Token',
    icon: 'https://assets.coingecko.com/coins/images/15595/small/metis.jpeg?1660285312',
    isNative: true,
  },
};
