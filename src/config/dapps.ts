import type { Token } from '@/types';

export const dapps = [
  {
    name: 'Agni Finance',
    dappRoute: 'agni-finance',
    TBD_TOKEN: 'Y',
    description: 'High-Capital Efficiency AMM-based DEX & Launchpad', // dapp radar
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [5000], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 5000,
    dappSrc: {
      5000: 'dapdapbos.near/widget/DappEntry.MantleSwap',
    } as { [key: number]: string },
  },
  {
    name: 'Ammos Finance',
    dappRoute: 'agni-finance',
    TBD_TOKEN: 'Y',
    description: 'Ultra capital-efficient decentralised exchange with low fees, built on Mantle Layer 2.', // dapp radar
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [5000], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 5000,
    dappSrc: {
      5000: 'dapdapbos.near/widget/DappEntry.MantleSwap',
    } as { [key: number]: string },
  },
  {
    name: 'FusionX V3',
    dappRoute: 'fusionx-v3',
    TBD_TOKEN: 'Y',
    description:
      'A Native DeFi ecosystem offering an AMM and a range of innovative financial services on the Mantle Network.', // dapp radar
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [5000], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 5000,
    dappSrc: {
      5000: 'dapdapbos.near/widget/DappEntry.MantleSwap',
    } as { [key: number]: string },
  },

  {
    name: 'FusionX V3',
    dappRoute: 'fusionx-v3',
    TBD_TOKEN: 'Y',
    description:
      'A Native DeFi ecosystem offering an AMM and a range of innovative financial services on the Mantle Network.', // dapp radar
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [5000], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 5000,
    dappSrc: {
      5000: 'dapdapbos.near/widget/DappEntry.MantleSwap',
    } as { [key: number]: string },
  },
  {
    name: 'iZiSwap',
    dappRoute: 'iziswap',
    TBD_TOKEN: 'N',
    description: 'A Multi-chain DeFi Protocol Providing One-Stop Liquidity as a Service', // dapp radar
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [5000, 59144], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 5000,
    dappSrc: {
      5000: 'dapdapbos.near/widget/DappEntry.MantleSwap',
      59144: 'dapdapbos.near/widget/DappEntry.LineaSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Syncswap',
    dappRoute: 'Syncswap',
    TBD_TOKEN: 'Y',
    description:
      'Powered by zero-knowledge technology, SyncSwap brings more people easy-to-use and low-cost DeFi with complete Ethereum security.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [59144, 324], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 59144,
    dappSrc: {
      59144: 'dapdapbos.near/widget/DappEntry.LineaSwap',
      324: 'dapdapbos.near/widget/DappEntry.ZkSyncSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Apeswap',
    dappRoute: 'apeswap',
    TBD_TOKEN: 'N',
    description: "Jump in to decentralized finance with ApeSwap's easy-to-use DeFi Hub", // dapp radar
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [42161, 56, 137], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 42161,
    dappSrc: {
      42161: 'dapdapbos.near/widget/DappEntry.ArbitrumSwap',
      56: 'dapdapbos.near/widget/DappEntry.BSCSwap',
      137: 'dapdapbos.near/widget/DappEntry.PolygonSwap',
    } as { [key: number]: string },
  },
  {
    name: 'BaseSwap',
    dappRoute: 'baseSwap',
    TBD_TOKEN: 'N',
    description:
      'The premier DEX on Base Chain. Crafted by a Based team, for a Based community. From simple to sophisticated, BaseSwap offers it all.', // dapp radar
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [8453], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 8453,
    dappSrc: {
      8453: 'dapdapbos.near/widget/DappEntry.BaseSwap',
    } as { [key: number]: string },
  },
  {
    name: 'Synthswap',
    dappRoute: 'Synthswap',
    TBD_TOKEN: 'N',
    description: 'Synthswap is the leading DEX on Base, completely audited by PeckShield.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [8453], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 8453,
    dappSrc: {
      8453: 'dapdapbos.near/widget/DappEntry.BaseSwap',
    } as { [key: number]: string },
  },

  {
    name: 'SwapBased',
    dappRoute: 'SwapBased',
    TBD_TOKEN: 'N',
    description:
      'SwapBased is an automated liquidity protocol implemented in a system of non-upgradeable smart contracts on the Base blockchain.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [8453], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 8453,
    dappSrc: {
      8453: 'dapdapbos.near/widget/DappEntry.BaseSwap',
    } as { [key: number]: string },
  },

  {
    name: 'RocketSwap',
    dappRoute: 'rocketswap',
    TBD_TOKEN: 'N',
    description:
      'RocketSwap is the first community initiated and driven decentralized exchange on Base Mainnet Network', // dapp radar
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [8453], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 8453,
    dappSrc: {
      8453: 'dapdapbos.near/widget/DappEntry.BaseSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Biswap',
    dappRoute: 'biSwap',
    TBD_TOKEN: 'N',
    description: 'Boost capital efficiency with flexible trading & earning features on Biswap', // dapp radar
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [56], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 56,
    dappSrc: {
      56: 'dapdapbos.near/widget/DappEntry.BSCSwap',
    } as { [key: number]: string },
  },

  {
    name: 'THENA V1',
    dappRoute: 'THENA-V1',
    TBD_TOKEN: 'N',
    description: 'THENA is THE native liquidity layer & AMM on BNB Chain',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [56], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 56,
    dappSrc: {
      56: 'dapdapbos.near/widget/DappEntry.BSCSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Orion',
    dappRoute: 'orion',
    TBD_TOKEN: 'N',
    description: 'The CEXs you love with the wallet you trust. Only on Orion.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [56], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 56,
    dappSrc: {
      56: 'dapdapbos.near/widget/DappEntry.BSCSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Camelot',
    dappRoute: 'camelot',
    TBD_TOKEN: 'N',
    description: 'An innovative and highly flexible DEX built to support the Arbitrum ecosystem.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [42161], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 42161,
    dappSrc: {
      42161: 'dapdapbos.near/widget/DappEntry.ArbitrumSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Chronos V1',
    dappRoute: 'chronos-v1',
    TBD_TOKEN: 'N',
    description: 'A community driven liquidity layer & AMM on Arbitrum',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [42161], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 42161,
    dappSrc: {
      42161: 'dapdapbos.near/widget/DappEntry.ArbitrumSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Spartadex',
    dappRoute: 'Spartadex',
    TBD_TOKEN: 'N',
    description: 'The first DEX with gamified yield',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [42161], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 42161,
    dappSrc: {
      42161: 'dapdapbos.near/widget/DappEntry.ArbitrumSwap',
    } as { [key: number]: string },
  },

  {
    name: 'SpaceFi',
    dappRoute: 'SpaceFi',
    TBD_TOKEN: 'N',
    description:
      'SpaceFi is the DeFi hub on zk-Rollups with DEX+NFT+Spacebase+Launchpad, exploring the Layer2 ecosystem.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [324], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 324,
    dappSrc: {
      324: 'dapdapbos.near/widget/DappEntry.ZkSyncSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Velocore V1',
    dappRoute: 'Velocore-V1',
    TBD_TOKEN: 'N',
    description:
      'Velocore is the first and the most optimal veDEX on multiple chains, built on the strong foundation of Velodrome.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [324], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 324,
    dappSrc: {
      324: 'dapdapbos.near/widget/DappEntry.ZkSyncSwap',
    } as { [key: number]: string },
  },

  {
    name: 'veSync',
    dappRoute: 'veSync',
    TBD_TOKEN: 'N',
    description:
      'veSync is a community-driven, ve(3,3) Decentralized Exchange (DEX) built on the zkSync network, providing a powerful and efficient platform for DeFi liquidity.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [324], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 324,
    dappSrc: {
      324: 'dapdapbos.near/widget/DappEntry.ZkSyncSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Ramses V1',
    dappRoute: 'ramses-v1',
    TBD_TOKEN: 'N',
    description: 'The native liquidity layer on Arbitrum',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [42161], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 42161,
    dappSrc: {
      42161: 'dapdapbos.near/widget/DappEntry.ArbitrumSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Ramses V2',
    dappRoute: 'ramses-v2',
    TBD_TOKEN: 'N',
    description: 'The native liquidity layer on Arbitrum',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [42161], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 42161,
    dappSrc: {
      42161: 'dapdapbos.near/widget/DappEntry.ArbitrumSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Honeyswap',
    dappRoute: 'honeyswap',
    TBD_TOKEN: 'N',
    description:
      'Honeyswap is network of decentralized exchanges which are supported and maintained by the 1Hive community.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [100, 137], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 100,
    dappSrc: {
      100: 'dapdapbos.near/widget/DappEntry.GnosisSwap',
      137: 'dapdapbos.near/widget/DappEntry.PolygonSwap',
    } as { [key: number]: string },
  },

  {
    name: 'PearlFi',
    dappRoute: 'pearlFi',
    TBD_TOKEN: 'N',
    description:
      'The Pearl thesis is a ve(3,3) flywheel that runs in reverse with bribes driving the ecosystem forward.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [137], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 137,
    dappSrc: {
      137: 'dapdapbos.near/widget/DappEntry.PolygonSwap',
    } as { [key: number]: string },
  },

  {
    name: 'QuickSwap',
    dappRoute: 'quickSwap',
    TBD_TOKEN: 'N',
    description: 'QuickSwap is a next-generation layer-2 decentralized exchange and Automated Market Maker.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [137], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 137,
    dappSrc: {
      137: 'dapdapbos.near/widget/DappEntry.PolygonSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Retro',
    dappRoute: 'retro',
    TBD_TOKEN: 'N',
    description: 'Retro is more than just a decentralized exchange and automated market maker.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [137], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 137,
    dappSrc: {
      137: 'dapdapbos.near/widget/DappEntry.PolygonSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Maia V3',
    dappRoute: 'maia-v3',
    TBD_TOKEN: 'N',
    description: 'Maia is the yield powerhouse of Metis with its community rooted in this Ethereum L2.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [1088], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 1088,
    dappSrc: {
      1088: 'dapdapbos.near/widget/DappEntry.MetisSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Netswap',
    dappRoute: 'netswap',
    TBD_TOKEN: 'N',
    description: 'One-stop trade, earn and win crypto on our decentralized platform based on the MetisDAO ecosystem',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [1088], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 1088,
    dappSrc: {
      1088: 'dapdapbos.near/widget/DappEntry.MetisSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Netswap',
    dappRoute: 'netswap',
    TBD_TOKEN: 'N',
    description: 'One-stop trade, earn and win crypto on our decentralized platform based on the MetisDAO ecosystem',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [1088], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 1088,
    dappSrc: {
      1088: 'dapdapbos.near/widget/DappEntry.MetisSwap',
    } as { [key: number]: string },
  },
];
