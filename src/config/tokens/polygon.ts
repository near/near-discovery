import type { Token } from '@/types';

const CHAIN_ID = 137;
export const polygon: { [key: string]: Token } = {
  matic: {
    chainId: CHAIN_ID,
    name: 'MATIC',
    symbol: 'MATIC',
    icon: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    decimals: 18,
    address: 'native',
    isNative: true,
  },
  eth: {
    chainId: CHAIN_ID,
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: 'https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916',
    decimals: 18,
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: 'https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295',
  },
  usdr: {
    chainId: CHAIN_ID,
    address: '0x40379a439D4F6795B6fc9aa5687dB461677A2dBa',
    decimals: 9,
    symbol: 'USDR',
    name: 'Real USD',
    icon: 'https://ipfs.near.social/ipfs/bafkreieocxobsqxkoopzh26huz5zjx4j5cpljzuufuipkmiiwopmym3ave',
  },

  wbtc: {
    chainId: CHAIN_ID,
    address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744',
  },

  hny: {
    chainId: CHAIN_ID,
    address: '0x1FA2F83BA2DF61c3d370071d61B17Be01e224f3a',
    decimals: 18,
    symbol: 'HNY',
    name: 'HONEY',
    icon: 'https://assets.coingecko.com/coins/images/12895/small/hnys.png?1614100588',
  },

  pcomb: {
    chainId: CHAIN_ID,
    address: '0x37D1EbC3Af809b8fADB45DCE7077eFc629b2B5BB',
    decimals: 18,
    symbol: 'pCOMB',
    name: 'Polygon Native Comb',
    icon: 'https://polygonscan.com/token/images/1hiveofc_32.png',
  },

  mimatic: {
    chainId: CHAIN_ID,
    address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
    decimals: 18,
    symbol: 'miMATIC',
    name: 'miMATIC',
    icon: 'https://assets.coingecko.com/coins/images/15264/small/mimatic-red.png?1620281018',
  },

  dai: {
    chainId: CHAIN_ID,
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    decimals: 18,
    symbol: 'Dai',
    name: 'Dai Stablecoin',
    icon: 'https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508',
  },

  wmatic: {
    chainId: CHAIN_ID,
    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    decimals: 18,
    symbol: 'WMATIC',
    name: 'Wrapped Matic',
    icon: 'https://assets.coingecko.com/coins/images/14073/small/matic.png?1628852392',
  },

  cash: {
    chainId: CHAIN_ID,
    address: '0x5D066D022EDE10eFa2717eD3D79f22F949F8C175',
    decimals: 18,
    symbol: 'CASH',
    name: 'CASH',
    icon: 'https://assets.coingecko.com/coins/images/27558/small/cash.png?1677063931',
  },

  wusdr: {
    chainId: CHAIN_ID,
    address: '0x00e8c0E92eB3Ad88189E7125Ec8825eDc03Ab265',
    decimals: 9,
    symbol: 'wUSDR',
    name: 'Wrapped USDR',
    icon: 'https://ipfs.near.social/ipfs/bafkreidij65snn5t2w2fbdgd7pluauudbtvgemvkx2wdk7kpoi5l2fqg4y',
  },

  cvr: {
    chainId: CHAIN_ID,
    address: '0x6AE96Cc93331c19148541D4D2f31363684917092',
    decimals: 18,
    symbol: 'CVR',
    name: 'CAVIAR',
    icon: 'https://ipfs.near.social/ipfs/bafkreiae66wm5kvk523gr2ogu3zf2soggysw73kyvkw2poaq6nicuttbxq',
  },

  pearl: {
    chainId: CHAIN_ID,
    address: '0x7238390d5f6F64e67c3211C343A410E2A3DEc142',
    decimals: 18,
    symbol: 'PEARL',
    name: 'Pearl',
    icon: 'https://ipfs.near.social/ipfs/bafkreieo7d2tqvpszlcvkltb6et2kmxz7n7yuw5ae5w37wzigzlht6i6zu',
  },

  usdt: {
    chainId: CHAIN_ID,
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663',
  },

  usdc: {
    chainId: CHAIN_ID,
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    decimals: 6,
    symbol: 'USDC.e',
    name: 'USD Coin (PoS)',
    icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389',
  },

  retro: {
    chainId: CHAIN_ID,
    address: '0xBFA35599c7AEbb0dAcE9b5aa3ca5f2a79624D8Eb',
    decimals: 18,
    symbol: 'RETRO',
    name: 'RETRO',
    icon: 'https://assets.coingecko.com/coins/images/31136/small/retro.png?1690885867',
  },

  aave: {
    chainId: CHAIN_ID,
    address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
    decimals: 18,
    symbol: 'AAVE',
    name: 'Aave (PoS)',
    icon: 'https://ipfs.near.social/ipfs/bafkreicmsnivbvp2xd3ewcjb5kybgnbnevbcojhn4mgub7rregnbtqcige',
  },
  quick: {
    chainId: CHAIN_ID,
    address: '0x831753dd7087cac61ab5644b308642cc1c33dc13',
    decimals: 18,
    symbol: 'QUICK',
    name: 'Quickswap',
    icon: 'https://ipfs.near.social/ipfs/bafkreic7svq723bgukivtik7lb3xujjq24s7wsxto4bfzlh235k2ejzjme',
  },
  link: {
    chainId: CHAIN_ID,
    address: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
    decimals: 18,
    symbol: 'LINK',
    name: 'ChainLink Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreidrq7qk3d6epwaxobq4gk7yowljr5tnslxwrsbd7vnw3srkt7ok3u',
  },
  sushi: {
    chainId: CHAIN_ID,
    address: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
    decimals: 18,
    symbol: 'SUSHI',
    name: 'SushiToken',
    icon: 'https://ipfs.near.social/ipfs/bafkreif5a3jne5ol2d57r2terziofqhosgl5txptv7q7bit42qt5jzoaqa',
  },
  crv: {
    chainId: CHAIN_ID,
    address: '0x172370d5Cd63279eFa6d502DAB29171933a610AF',
    decimals: 18,
    symbol: 'CRV',
    name: 'Token CRV (PoS)',
    icon: 'https://ipfs.near.social/ipfs/bafkreihfv7kul7d6e2fxnlpalx3p7wx47ylhw7tauozhipcughshj25ehm',
  },
};
