import type { Chain } from '@/types';


//TODO: need wrap token address
//TODO: need all chains live on dapdap

export const colors: { [key: number]: string } = {
  8453: '0, 56, 255',
  5000: '65, 109, 109',
  1: '',
  42161: '25, 70, 137',
  43114: '142, 3, 3',
  56: '151, 110, 6',
  59144: '',
  1088: '',
  10: '169, 51, 51',
  137: '67, 25, 137',
  1101: '169, 84, 255',
  324: '87, 53, 181',
  100: '10, 71, 23',
  0: '235, 244, 121',
};

const chainCofig = {
  8453: {
    chainId: 8453,
    chainName: 'Base',
    icon: 'https://assets.dapdap.net/images/bafkreif24bmxzparik2t2nkog6km5diuwcysvxdv2j5ygzkzwm3pxs573a.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://developer-access-mainnet.base.org'],
    blockExplorers: 'https://basescan.org',
  },
  5000: {
    chainId: 5000,
    chainName: 'Mantle',
    icon: 'https://assets.dapdap.net/images/bafkreicmbhykgsvj4rdujduh2fujbsrgp3mkqpqlw2weyuxdfqpwtka6la.svg',
    nativeCurrency: { name: 'MNT', symbol: 'MNT', decimals: 18 },
    rpcUrls: ['https://mantle-mainnet.public.blastapi.io'],
    blockExplorers: 'https://mantlescan.info',
  },

  1: {
    chainId: 1,
    chainName: 'Ethereum',
    icon: 'https://assets.dapdap.net/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorers: 'https://etherscan.io',
  },
  42161: {
    chainId: 42161,
    chainName: 'Arbitrum',
    icon: 'https://assets.dapdap.net/images/bafkreiajyg2iof2wygtgromy6a2yfl2fqavfy235k7afc4frr7xnljvu2a.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorers: 'https://arbiscan.io',
  },
  43114: {
    chainId: 43114,
    chainName: 'Avalanche',
    icon: 'https://assets.dapdap.net/images/bafkreig47jh4spznafxdn2nemwt5uij7pgimfpbjrt5m4cwbi4dccfvvpe.svg',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorers: 'https://snowtrace.io',
  },
  56: {
    chainId: 56,
    chainName: 'BSC',
    icon: 'https://assets.dapdap.net/images/bafkreibtexscwwgqupgb7anrseqdpogvt4cckyv4kavr7o3jgtcqzjkx5m.svg',
    nativeCurrency: { name: 'BSC', symbol: 'BSC', decimals: 18 },
    rpcUrls: ['https://binance.llamarpc.com'],
    blockExplorers: 'https://bscscan.com',
  },
  59144: {
    chainId: 59144,
    chainName: 'Linea',
    icon: 'https://assets.dapdap.net/images/bafkreib5v3jonanuknj5db5ysuhb6ubowv2pqnopyg3yraknfr3jn7el4u.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://linea.blockpi.network/v1/rpc/public'],
    blockExplorers: 'https://lineascan.build',
  },
  1088: {
    chainId: 1088,
    chainName: 'Metis',
    icon: 'https://assets.dapdap.net/images/bafkreifjzbjcownp4mlvkyai4yks55bdjevci7uj7i3nbc45sg65ulmtwu.svg',
    nativeCurrency: { name: 'METIS', symbol: 'METIS', decimals: 18 },
    rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
    blockExplorers: 'https://andromeda-explorer.metis.io',
  },
  10: {
    chainId: 10,
    chainName: 'Optimism',
    icon: 'https://assets.dapdap.net/images/bafkreidax5cwumzbzrttt7iswlzhdndtbzyiyrg6yy4jbtydm2ihvlpo6a.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/optimism'],
    blockExplorers: 'https://optimistic.etherscan.io',
  },
  137: {
    chainId: 137,
    chainName: 'Polygon',
    icon: 'https://assets.dapdap.net/images/bafkreic6p22qh3ytwkpmv5hq6a3ppdq7xoyvnmeog3wbtugnao434q6d7a.svg',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon.llamarpc.com'],
    blockExplorers: 'https://polygonscan.com',
  },

  1101: {
    chainId: 1101,
    chainName: 'Polygon zkEVM',
    icon: 'https://assets.dapdap.net/images/bafkreie5b65e7cp7jtvhrwgibvoqpf7ekj4v7jgo2egjr3qmfsl3p4ulam.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://zkevm-rpc.com'],
    blockExplorers: 'https://zkevm.polygonscan.com',
  },
  324: {
    chainId: 324,
    chainName: 'zkSync',
    engine: 'lifi',
    icon: 'https://assets.dapdap.net/images/bafkreibcq6agazqmv5euwf355v7x7hlinz3jkuins2bkfffdbp3jgbjj6u.svg',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.era.zksync.io'],
    blockExplorers: 'https://explorer.zksync.io/',
  },
  100: {
    chainId: 100,
    chainName: 'Gnosis',
    icon: 'https://assets.dapdap.net/images/bafkreiazsyndhevopspbjue3ztz5r5mypuzpa5gjragm3hdg6ey33rfheu.svg',
    nativeCurrency: { name: 'XDAI', symbol: 'XDAI', decimals: 18 },
    rpcUrls: ['https://rpc.ankr.com/gnosis'],
    blockExplorers: 'https://gnosisscan.io/',
  },
} as { [key: number]: Chain };


export default chainCofig