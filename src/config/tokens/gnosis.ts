import type { Token } from '@/types';

const CHAIN_ID = 100;
export const gnosis: { [key: string]: Token } = {
  xdai: {
    chainId: CHAIN_ID,
    name: 'XDAI',
    symbol: 'XDAI',
    icon: 'https://ipfs.near.social/ipfs/bafkreieu6n7cav63nwjj5klcsxrk26eo5pqkc4u7xzfle2bjgi5ijm7ipe',
    decimals: 18,
    isNative: true,
    address: 'native',
  },
  gno: {
    chainId: CHAIN_ID,
    address: '0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb',
    decimals: 18,
    symbol: 'GNO',
    name: 'Gnosis Token on xDai',
    icon: 'https://ipfs.near.social/ipfs/bafkreicldmi7glc46rvi5qhfvcvdwgr5ove3jwrrs7pfjluhgynbt74d3q',
  },
  wxdai: {
    chainId: CHAIN_ID,
    address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    decimals: 18,
    symbol: 'WXDAI',
    name: 'Wrapped XDAI',
    icon: 'https://ipfs.near.social/ipfs/bafkreieu6n7cav63nwjj5klcsxrk26eo5pqkc4u7xzfle2bjgi5ijm7ipe',
  },
  donut: {
    chainId: CHAIN_ID,
    address: '0x524b969793a64a602342d89bc2789d43a016b13a',
    decimals: 18,
    symbol: 'DONUT',
    name: 'Donut on xDai',
    icon: 'https://ipfs.near.social/ipfs/bafkreie7eokwmmskbml6sh35iiu7byl5zb4pttytqvczkiu2t2wzop74oq',
  },
  hny: {
    chainId: CHAIN_ID,
    address: '0x71850b7e9ee3f13ab46d67167341e4bdc905eef9',
    decimals: 18,
    symbol: 'HNY',
    name: 'Honey',
    icon: 'https://ipfs.near.social/ipfs/bafkreibs2v3zz24hntb4fg4znjvftoke3ybtlan3a6myhruzm6i453wily',
  },
  weth: {
    chainId: CHAIN_ID,
    address: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether on xDai',
    icon: 'https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4',
  },
  wbtc: {
    chainId: CHAIN_ID,
    address: '0x8e5bbbb09ed1ebde8674cda39a0c169401db4252',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC on xDai',
    icon: 'https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q',
  },
};
