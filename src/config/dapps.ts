import chains from './chains';

export const dapps = [
  {
    name: 'Agni Finance',
    icon: 'https://ipfs.near.social/ipfs/bafkreihkerekcdjd3cgxzklknlx6ai7zxil24sdcji6fahtlpueqsids6u',
    factory: '0x25780dc8Fc3cfBD75F33bFDAB65e969b603b2035',
    router: '0x319B69888b0d11cEC22caA5034e25FfFBDc88421',
    quoter: '0x9488C05a7b75a6FefdcAE4f11a33467bcBA60177',
    token_live: false, // false or true TODO: not sure
    description:
      'Agni Finance is a high-capital efficiency, AMM-based DEX and launchpad built to support the Mantle Network ecosystem.', // dapp radar
    tags: ['Dexes'],
    quoterSrc: '', //TODO:
    routerSrc: '', //TODO:
    on_chain_ids: [5000], // get chain config from chains.ts
    tokens: {
      // tokens on chain id map
      5000: [
        {
          address: '0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111',
          symbol: 'WETH',
          decimals: 18,
          icon: 'https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295',
        },
        {
          address: '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9',
          symbol: 'USDC',
          decimals: 6,
          icon: 'https://ethereum-optimism.github.io/data/USDC/logo.png',
        },
        {
          address: 'native',
          symbol: 'MNT',
          decimals: 18,
          icon: 'https://assets.coingecko.com/coins/images/30980/small/token-logo.png?1689320029',
        },
        {
          address: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE',
          symbol: 'USDT',
          decimals: 6,
          icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
        },
      ],
    },
  },
  {
    name: 'Ammos Finance',
    icon: 'https://ipfs.near.social/ipfs/bafkreicwvufboezdhcjnvmwmy5ctbd7d4zimdivuaawn5g3bs2hxb567ra',
    factory: '0x636eA278699A300d3A849aB2cE36c891C4eE3Da0',
    router: '0xBa68D459210Fc667a97245F71719a479CAFeB571',
    quoterSrc: '', //TODO:
    routerSrc: '', //TODO:
    token_live: false, // false or true TODO: not sure
  },
];
