import { Chain } from '@/types';

export default {
  8453: {
    chainId: 8453,
    chainName: 'Base',
    icon: 'https://ipfs.near.social/ipfs/bafkreie5bhns75smpybjndl3utvzpaftrlrwqrblwg44ntzjsnit6lajzm',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://developer-access-mainnet.base.org'],
    blockExplorers: 'https://basescan.org/',
  },
  1: {
    chainId: 1,
    chainName: 'Ethereum',
    icon: 'https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorers: 'https://etherscan.io',
  },
} as { [key: number]: Chain };
