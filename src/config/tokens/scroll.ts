import type { Token } from '@/types';

const CHAIN_ID = 534352;

export const scroll: { [key: string]: Token } = {
  eth: {
    address: 'native',
    isNative: true,
    chainId: CHAIN_ID,
    symbol: 'ETH',
    decimals: 18,
    name: 'Ether',
    icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
  },
  usdt: {
    chainId: CHAIN_ID,
    address: '0xf55bec9cafdbe8730f096aa55dad6d22d44099df',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: 'https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i',
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x5300000000000000000000000000000000000004',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: 'https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4',
  },
  usdc: {
    chainId: CHAIN_ID,
    address: '0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    icon: 'https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla',
  },
  lusd: {
    chainId: CHAIN_ID,
    address: '0xedeabc3a1e7d21fe835ffa6f83a710c70bb1a051',
    name: 'LUSD Stablecoin',
    symbol: 'LUSD',
    icon: 'https://assets.coingecko.com/coins/images/14666/standard/Group_3.png?1696514341',
    decimals: 18,
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0x3c1bca5a656e69edcd0d4e36bebb3fcdaca60cf1',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: 'https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q',
  },
  lab: {
    chainId: CHAIN_ID,
    address: '0x2A00647F45047f05BDed961Eb8ECABc42780e604',
    decimals: 18,
    symbol: 'LAB',
    name: 'LineaBank Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreihjcqx2wtmzq6l2dobpx7oe5zb5epz3frvgzw6wfnojkps7d6cjce',
  },
  wsteth: {
    chainId: CHAIN_ID,
    name: 'Wrapped liquid staked Ether 2.0',
    symbol: 'wstETH',
    icon: 'https://ipfs.near.social/ipfs/bafkreibukwahpp2ei74ax5acm6p7uwcnbsfvdzkizsdzqu26yfbxndpvra',
    decimals: 18,
    address: '0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32',
  },
  sky: {
    chainId: CHAIN_ID,
    name: 'Skydrome',
    symbol: 'SKY',
    icon: '/images/tokens/sky.png',
    decimals: 18,
    address: '0x95a52ec1d60e74cd3eb002fe54a2c74b185a4c16',
  },
};
