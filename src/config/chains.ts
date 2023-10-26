import { Chain } from '@/types';

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
  1: {
    chainId: 1,
    chainName: 'Ethereum',
    icon: 'https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorers: 'https://etherscan.io',
  },
  42161: {
    chainId: 42161,
    chainName: 'Arbitrum',
    icon: 'https://ipfs.near.social/ipfs/bafkreicbrc7qqle4c7hmdcjhw23ciyund3zy42wlm3akfa6eafho6tm43e',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorers: 'https://arbiscan.io',
  },
  43114: {
    chainId: 43114,
    chainName: 'Avalanche',
    icon: 'https://ipfs.near.social/ipfs/bafkreid6iw3oxfkyps37bts62rw33vr6q4aekwa36bfq7ywdhsiiqh5po4',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorers: 'https://snowtrace.io',
  },
  56: {
    chainId: 56,
    chainName: 'BNB',
    icon: 'https://ipfs.near.social/ipfs/bafkreiddwc2z4cctwwjro5w25w6avavdghg3xcjjvtzxkvm2bntwyzlrqq',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
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
    icon: 'https://ipfs.near.social/ipfs/bafkreicmrfbaejeef4br5g6fekzhcrrc2rfw4hcmusie2t2m4qsl45x2qe',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon.llamarpc.com'],
    blockExplorers: 'https://polygonscan.com',
  },
} as { [key: number]: Chain };
