const popupsData: {
  [key: string]: {
    title: string;
    path: string;
    icon: string;
    bgColor: string;
    selectBgColor: string;
    chainId: number;
    rpcUrls: string[];
  };
} = {
  arbitrum: {
    title: 'Arbitrum',
    path: 'arbitrum',
    icon: 'https://assets.dapdap.net/images/bafkreicxdjysr5urjg2hfpfts2b7ptb6q3fge7ncuhzw4puqybi4dwlbdu.svg',
    bgColor: '#3564AB',
    selectBgColor: '#3564AB',
    chainId: 42161,
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
  },
  avalanche: {
    title: 'Avalanche',
    path: 'avalanche',
    icon: 'https://assets.dapdap.net/images/bafkreifdm3vpor4xyh2y7ibcr4dsy262qgesegy7slrfjbo4imohqd4sfq.svg',
    bgColor: '#AF1616',
    selectBgColor: '#AF1616',
    chainId: 43114,
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  },
  base: {
    title: 'Base',
    path: 'base',
    icon: 'https://assets.dapdap.net/images/bafkreientyvw2l6v2jvtcq5pptg5xftj2dyobnk3yaykbu5mb6tpomzc3q.svg',
    bgColor: '#0038FF',
    selectBgColor: '#0038FF',
    chainId: 8453,
    rpcUrls: ['https://developer-access-mainnet.base.org'],
  },
  bsc: {
    title: 'BSC',
    path: 'bsc',
    icon: 'https://assets.dapdap.net/images/bafkreiczurnr4ai5epzfovu4btugbrfsoc57d42wnz22kdjmogz3ewfgcm.svg',
    bgColor: '#FFBF19',
    selectBgColor: '#FFBF19',
    chainId: 56,
    rpcUrls: ['https://binance.llamarpc.com'],
  },
  gnosis: {
    title: 'Gnosis',
    path: 'gnosis',
    icon: 'https://assets.dapdap.net/images/bafkreiazsyndhevopspbjue3ztz5r5mypuzpa5gjragm3hdg6ey33rfheu.svg',
    bgColor: '#04795B',
    selectBgColor: '#04795B',
    chainId: 100,
    rpcUrls: ['https://rpc.ankr.com/gnosis'],
  },
  linea: {
    title: 'Linea',
    path: 'linea',
    icon: 'https://assets.dapdap.net/images/bafkreiek2q3da5dpzt7jlvdp5y4b7xh2tsdb5syh75b3amfwhb7x6vi7oa.svg',
    bgColor: '#131313',
    selectBgColor: '#35bde3',
    chainId: 59144,
    rpcUrls: ['https://linea.blockpi.network/v1/rpc/public'],
  },
  mantle: {
    title: 'Mantle',
    path: 'mantle',
    icon: 'https://assets.dapdap.net/images/bafkreiboehkc3sfdmzzsv7abvhssavcicom3mjjm4wje3zgm3nzg5w4kbu.svg',
    bgColor: '#000000',
    selectBgColor: 'rgb(0,255,224)',
    chainId: 5000,
    rpcUrls: ['https://mantle-mainnet.public.blastapi.io'],
  },
  metis: {
    title: 'Metis',
    path: 'metis',
    icon: 'https://assets.dapdap.net/images/bafkreiaekamkcbf7ixg3w6wl25zd4orgkmshxkz36vncpomenfu3ryymty.svg',
    bgColor: '#000000',
    selectBgColor: '#00dacc',
    chainId: 1088,
    rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
  },
  optimism: {
    title: 'Optimism',
    path: 'optimism',
    icon: 'https://assets.dapdap.net/images/bafkreihejurzfytybrvjy2b5vie5eppb4erhaimhtv25koseml3vhv3lse.svg',
    bgColor: '#CA0C0C',
    selectBgColor: '#CA0C0C',
    chainId: 10,
    rpcUrls: ['https://rpc.ankr.com/optimism'],
  },
  'polygon-zkevm': {
    title: 'Polygon zkEVM',
    path: 'polygon-zkevm',
    icon: 'https://assets.dapdap.net/images/bafkreielam3balduseacp3gulszhxiwzf7hcyoaau6goxdwgsavqfou5hi.svg',
    bgColor: '#A55FFF',
    selectBgColor: '#A55FFF',
    chainId: 1101,
    rpcUrls: ['https://zkevm-rpc.com'],
  },
  polygon: {
    title: 'Polygon',
    path: 'polygon',
    icon: 'https://assets.dapdap.net/images/bafkreicq7b2rylubg6pli3mgxjdpml4rdju2upxq25a6nd35xepiqakgfy.svg',
    bgColor: '#5C28D8',
    selectBgColor: '#5C28D8',
    chainId: 137,
    rpcUrls: ['https://polygon.llamarpc.com'],
  },
  zksync: {
    title: 'zkSync',
    path: 'zksync',
    icon: 'https://assets.dapdap.net/images/bafkreicwo7gbj23ay4r6w5wwdwllyaxd6eo4w2cngr64sp26z5wmke7xju.svg',
    bgColor: '#FFFFFF',
    selectBgColor: '#3b6bdc',
    chainId: 324,
    rpcUrls: ['https://mainnet.era.zksync.io'],
  },
};

export default popupsData;
