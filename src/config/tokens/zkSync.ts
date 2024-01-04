import type { Token } from '@/types';

const CHAIN_ID = 324;
export const zkSync: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    address: 'native',
    isNative: true,
    decimals: 18,
    symbol: 'ETH',
    name: 'ETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0xBBeB516fb02a01611cBBE0453Fe3c580D7281011',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: 'https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q',
  },

  vc: {
    chainId: CHAIN_ID,
    address: '0x85D84c774CF8e9fF85342684b0E795Df72A24908',
    decimals: 18,
    symbol: 'VC',
    name: 'VC',
    icon: 'https://ipfs.near.social/ipfs/bafkreia2pgyfxypmylp7f4ypoqagctrjg63akkoc4zvamy3ugfqamqpnmq',
  },

  waifu: {
    chainId: CHAIN_ID,
    address: '0xA4E4d9984366e74713737Cb5d646bbA0B7E070A4',
    decimals: 18,
    symbol: 'WAIFU',
    name: 'WAIFU',
    icon: 'https://ipfs.near.social/ipfs/bafkreibaxkkmqu5rnogicxaliozhi5vjbzzoisncrhgwe3g2s7q6rchjty',
  },

  weth: {
    chainId: CHAIN_ID,
    address: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: 'https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295',
  },

  zch: {
    chainId: CHAIN_ID,
    address: '0xe8f5fbedd89c756a97de655b8d06a5b5cc3452ed',
    decimals: 18,
    symbol: 'ZCH',
    name: 'ZilchToken',
    icon: 'https://ipfs.near.social/ipfs/bafkreifquhaltsucnz2heyboy66nhklqrzopqk65o5x66s764za6nzbqou',
  },

  keyvc: {
    chainId: CHAIN_ID,
    address: '0x4a57dA213A589F305B8411f15f64fb8c5724e7CE',
    decimals: 18,
    symbol: 'keyVC',
    name: 'ZilchToken',
    icon: 'https://ipfs.near.social/ipfs/bafkreidx3ep2qhq6kdxey4yae5umjsufyymntblhbji7yoyabp2bd7hcou',
  },

  lsd: {
    chainId: CHAIN_ID,
    address: '0x458A2E32eAbc7626187E6b75f29D7030a5202bD4',
    decimals: 18,
    symbol: 'LSD',
    name: 'LSD',
    icon: 'https://ipfs.near.social/ipfs/bafkreigeq5rmi74c4reudxe23hmu4udtee7im3gwdjh72uyav7d2ayhxoi',
  },

  usx: {
    chainId: CHAIN_ID,
    address: '0xdb89D7b0Dccd0C0e5aC3571133A9aa1a037945cb',
    decimals: 18,
    symbol: 'USX',
    name: 'USX',
    icon: 'https://ipfs.near.social/ipfs/bafkreidhsn7jgwtcgvwboxwfkwj5sv6ndgqxmlkf7n72o2uoyggcatdsba',
  },

  dvf: {
    chainId: CHAIN_ID,
    address: '0xbbd1ba24d589c319c86519646817f2f153c9b716',
    decimals: 18,
    symbol: 'DVF',
    name: 'DeversiFi Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreigb3eo2jkoid4bouqjhfqlde5zlhugdwu6jvzd6avxtphqfygl7ua',
  },

  iusd: {
    chainId: CHAIN_ID,
    address: '0x1382628e018010035999A1FF330447a0751aa84f',
    decimals: 18,
    symbol: 'iUSD',
    name: 'iZUMi Bond USD',
    icon: 'https://ipfs.near.social/ipfs/bafkreiabjt25div73chcsnfhfqlfxj62j5fp2fvnl427qv3mlicx2bwanq',
  },

  slusdt: {
    chainId: CHAIN_ID,
    address: '0x496d88D1EFc3E145b7c12d53B78Ce5E7eda7a42c',
    decimals: 18,
    symbol: 'slUSDT',
    name: 'Shared-liquidity USDT',
    icon: 'https://ipfs.near.social/ipfs/bafkreibxvxdhd7go2rtgwmbpxhmm5cmdrkh3oeenuys2nc5lucs44anwam',
  },

  lusd: {
    chainId: CHAIN_ID,
    address: '0x503234F203fC7Eb888EEC8513210612a43Cf6115',
    decimals: 18,
    symbol: 'LUSD',
    name: 'LUSD Stablecoin',
    icon: 'https://ipfs.near.social/ipfs/bafkreihbwhrsi447phga5fya4eb4nprudswmh4n5togvpyy4gowntcei5e',
  },

  reth: {
    chainId: CHAIN_ID,
    address: '0x32fd44bb869620c0ef993754c8a00be67c464806',
    decimals: 18,
    symbol: 'rETH',
    name: 'Rocket Pool ETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreiev6hgtqtg5wleen3wtnk7cejxpdmj5ee2ngkaswphvcwwv5xcsyy',
  },

  space: {
    chainId: CHAIN_ID,
    address: '0x47260090cE5e83454d5f05A0AbbB2C953835f777',
    decimals: 18,
    symbol: 'SPACE',
    name: 'SPACE',
    icon: 'https://ipfs.near.social/ipfs/bafkreibem7ts37qyb22pwn6qwdl2ocbye52oza2hdpjvxpxslwb6jfi2vm',
  },
  cebnb: {
    chainId: CHAIN_ID,
    address: '0x7400793aad94c8ca801aa036357d10f5fd0ce08f',
    decimals: 18,
    symbol: 'ceBNB',
    name: 'Celer Network BNB',
    icon: 'https://ipfs.near.social/ipfs/bafkreiaeq6ca67je5ocago6vk2efwxiqurxgemputx7p2nt6n2p3zo65xq',
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0x493257fd37edb34451f62edf8d2a0c418852ba4c',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: 'https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i',
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    icon: 'https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla',
  },
  cebusd: {
    chainId: CHAIN_ID,
    address: '0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181',
    decimals: 18,
    symbol: 'ceBUSD',
    name: 'Celer Network BUSD',
    icon: 'https://ipfs.near.social/ipfs/bafkreibp36dfkfjzgnnbb7u4jxh57gpjmfjerc6pefmyzhueulz5ovd5xy',
  },
};
