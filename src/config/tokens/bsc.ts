import { Token } from '@/types';

const CHAIN_ID = 56;
export const bsc: { [key: string]: Token } = {
  usdt: {
    chainId: CHAIN_ID,
    address: '0x55d398326f99059fF775485246999027B3197955',
    symbol: 'BSC-USD',
    name: 'Binance-Peg BSC-USD',
    icon: 'https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661',
    decimals: 18,
  },
  usdd: {
    chainId: CHAIN_ID,
    address: '0xd17479997F34dd9156Deef8F95A52D81D265be9c',
    name: 'Decentralized USD',
    symbol: 'USDD',
    icon: 'https://assets.coingecko.com/coins/images/25380/standard/UUSD.jpg?1696524513',
    decimals: 18,
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0x3F56e0c36d275367b8C502090EDF38289b3dEa0d',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: 'https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916',
    decimals: 18,
  },
  bnb: {
    chainId: CHAIN_ID,
    decimals: 18,
    symbol: 'BNB',
    name: 'BNB',
    icon: 'https://ipfs.near.social/ipfs/bafkreiaeq6ca67je5ocago6vk2efwxiqurxgemputx7p2nt6n2p3zo65xq',
    isNative: true,
  },
  eth: {
    chainId: CHAIN_ID,
    address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    decimals: 18,
    symbol: 'ETH',
    name: 'Binance-Peg Ethereum Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
  },
};
