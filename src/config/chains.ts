import type { Chain } from '@/types';

//TODO: need wrap token address
//TODO: need all chains live on dapdap

export default {
  8453: {
    chainId: 8453,
    chainName: 'Base',
    icon: 'https://ipfs.near.social/ipfs/bafkreie5bhns75smpybjndl3utvzpaftrlrwqrblwg44ntzjsnit6lajzm',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://developer-access-mainnet.base.org'],
    blockExplorers: 'https://basescan.org',
  },
  5000: {
    chainId: 5000,
    chainName: 'Mantle',
    icon: 'https://ipfs.near.social/ipfs/bafkreicmbhykgsvj4rdujduh2fujbsrgp3mkqpqlw2weyuxdfqpwtka6la',
    nativeCurrency: { name: 'MNT', symbol: 'MNT', decimals: 18 },
    rpcUrls: ['https://mantle-mainnet.public.blastapi.io'],
    blockExplorers: 'https://mantlescan.info',
  },

  1: {
    chainId: 1,
    chainName: 'Ethereum',
    icon: 'https://ipfs.near.social/ipfs/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorers: 'https://etherscan.io',
  },
  42161: {
    chainId: 42161,
    chainName: 'Arbitrum',
    icon: 'https://ipfs.near.social/ipfs/bafkreiajyg2iof2wygtgromy6a2yfl2fqavfy235k7afc4frr7xnljvu2a',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorers: 'https://arbiscan.io',
  },
  43114: {
    chainId: 43114,
    chainName: 'Avalanche',
    icon: 'https://ipfs.near.social/ipfs/bafkreig47jh4spznafxdn2nemwt5uij7pgimfpbjrt5m4cwbi4dccfvvpe',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorers: 'https://snowtrace.io',
  },
  56: {
    chainId: 56,
    chainName: 'BSC',
    icon: 'https://ipfs.near.social/ipfs/bafkreibtexscwwgqupgb7anrseqdpogvt4cckyv4kavr7o3jgtcqzjkx5m',
    nativeCurrency: { name: 'BSC', symbol: 'BSC', decimals: 18 },
    rpcUrls: ['https://binance.llamarpc.com'],
    blockExplorers: 'https://bscscan.com',
  },
  59144: {
    chainId: 59144,
    chainName: 'Linea',
    icon: 'https://ipfs.near.social/ipfs/bafkreidase4ydzf6b7cme2tx5r45vt6ua2mzdkoykwcrbydfudb4xvekvy',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://linea.blockpi.network/v1/rpc/public'],
    blockExplorers: 'https://lineascan.build',
  },
  1088: {
    chainId: 1088,
    chainName: 'Metis',
    icon: 'https://ipfs.near.social/ipfs/bafkreibye3shfb7bmpnsqw3yscb7yxd4kjsbnszeyluivnrslobvrcd2ci',
    nativeCurrency: { name: 'METIS', symbol: 'METIS', decimals: 18 },
    rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
    blockExplorers: 'https://andromeda-explorer.metis.io',
  },
  10: {
    chainId: 10,
    chainName: 'Optimism',
    icon: 'https://ipfs.near.social/ipfs/bafkreia4smb3wz4f3jozeuatdtvtxcxk2orwx4jdxzt3nx42f6rw57d27y',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/optimism'],
    blockExplorers: 'https://optimistic.etherscan.io',
  },
  137: {
    chainId: 137,
    chainName: 'Polygon',
    icon: 'https://ipfs.near.social/ipfs/bafkreic6p22qh3ytwkpmv5hq6a3ppdq7xoyvnmeog3wbtugnao434q6d7a',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon.llamarpc.com'],
    blockExplorers: 'https://polygonscan.com',
  },

  1101: {
    chainId: 1101,
    chainName: 'Polygon zkEVM',
    icon: 'https://ipfs.near.social/ipfs/bafkreie5b65e7cp7jtvhrwgibvoqpf7ekj4v7jgo2egjr3qmfsl3p4ulam',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://zkevm-rpc.com'],
    blockExplorers: 'https://zkevm.polygonscan.com',
  },
  324: {
    chainId: 324,
    chainName: 'zkSync',
    icon: 'https://ipfs.near.social/ipfs/bafkreibcq6agazqmv5euwf355v7x7hlinz3jkuins2bkfffdbp3jgbjj6u',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.era.zksync.io'],
    blockExplorers: 'https://explorer.zksync.io/',
  },

  100: {
    chainId: 100,
    chainName: 'Gnosis',
    icon: 'https://ipfs.near.social/ipfs/bafkreiazsyndhevopspbjue3ztz5r5mypuzpa5gjragm3hdg6ey33rfheu',
    nativeCurrency: { name: 'XDAI', symbol: 'XDAI', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/gnosis'],
    blockExplorers: 'https://gnosisscan.io/',
  },
} as { [key: number]: Chain };
