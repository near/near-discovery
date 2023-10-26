import type { Token } from '@/types';

const CHAIN_ID = 10;
export const optimism: { [key: string]: Token } = {
  eth: {
    chainId: CHAIN_ID,
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
    isNative: true,
  },
  'usdc.e': {
    chainId: CHAIN_ID,
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    name: 'USD Coin (Bridged from Ethereum)',
    symbol: 'USDC.e',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6,
  },
  dai: {
    chainId: CHAIN_ID,
    address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    icon: 'https://assets.coingecko.com/coins/images/9956/standard/Badge_Dai.png?1696509996',
    decimals: 18,
  },
  frax: {
    chainId: CHAIN_ID,
    address: '0x2E3D870790dC77A83DD1d18184Acc7439A53f475',
    name: 'Frax',
    symbol: 'FRAX',
    icon: 'https://assets.coingecko.com/coins/images/13422/standard/FRAX_icon.png?1696513182',
    decimals: 18,
  },
  mai: {
    chainId: CHAIN_ID,
    address: '0xdFA46478F9e5EA86d57387849598dbFB2e964b02',
    name: 'Mai Stablecoin',
    symbol: 'MAI',
    icon: 'https://assets.coingecko.com/coins/images/15264/standard/mimatic-red.png?1696514916',
    decimals: 18,
  },
  lusd: {
    chainId: CHAIN_ID,
    address: '0xc40F949F8a4e094D1b49a23ea9241D289B7b2819',
    name: 'LUSD Stablecoin',
    symbol: 'LUSD',
    icon: 'https://assets.coingecko.com/coins/images/14666/standard/Group_3.png?1696514341',
    decimals: 18,
  },
  sUSD: {
    chainId: CHAIN_ID,
    address: '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9',
    name: 'Synth sUSD',
    symbol: 'sUSD',
    icon: 'https://assets.coingecko.com/coins/images/5013/standard/sUSD.png?1696505546',
    decimals: 18,
  },
};
