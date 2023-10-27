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
    logo: 'https://ipfs.near.social/ipfs/bafkreiggpt4eld46yk6i5u7cty7zwmcuiq3wx6jkopcm3sxgzqoujoj6iy',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreidzxjgiaisjnva6rjdsvcr5f4urskismfu4dljfyby5l3hxdnjx5u',
    dappSrc: {
      5000: 'dapdapbos.near/widget/DappEntry.MantleSwap',
    } as { [key: number]: string },
  },
  {
    name: 'FusionX V3',
    dappRoute: 'fusionx-v3',
    TBD_TOKEN: 'Y',
    logo: 'https://ipfs.near.social/ipfs/bafkreic6yr27mq42yx6o4fklwbkl5r6dvwc2x5elri6zczye7uskvrlc5e',
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
    logo:'https://ipfs.near.social/ipfs/bafkreictpy7n6edfe5boqidwwowccjv4cppterjxtp3ou3wdxagl6adiou',
    dappSrc: {
      5000: 'dapdapbos.near/widget/DappEntry.MantleSwap',
      59144: 'dapdapbos.near/widget/DappEntry.LineaSwap',
    } as { [key: number]: string },
    icon: 'https://ipfs.near.social/ipfs/bafkreifsgwu2zd6y2n5alekr5qgdhzoivlkl5wujtq3z7gnm5pw4jy7sgi',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreicqpts7rramccqvvw7tajq5ax56ssxbs7dspxipbxxov4d6zucbw4',
    dappSrc: {
      59144: 'dapdapbos.near/widget/DappEntry.LineaSwap',
      324: 'dapdapbos.near/widget/DappEntry.ZkSyncSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Apeswap',
    dappRoute: 'apeswap',
    TBD_TOKEN: 'N',
    logo: 'https://ipfs.near.social/ipfs/bafkreidwg3iip6lpy24x73e2eopoyib6sc36cqwaljfnjig4nnrelj7a5a',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreia6o7raj6x55wmkt4hxjjul6ydz2oq32olfgco4xw67xzgvxsbxa4',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreieeeqe7h7ehtxt3jjaqwyqxgzdpqjzv5vkk3zbx7lsh7kxqtv547m',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreidhivnirorddkdudcd6oca6gvhps66audqn3lppsoehlyvorf6p4i',
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
    logo: 'https://app.rocketswap.cc/_next/image?url=https%3A%2F%2Ftoken.g34gsgv.top%2Flogo.png&w=256&q=75',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreifyozbu3f42todc2pz7pgeoqiaz2upfis7voy3tk4v3zcxetxva3y',
    dappSrc: {
      56: 'dapdapbos.near/widget/DappEntry.BSCSwap',
    } as { [key: number]: string },
  },

  {
    name: 'THENA V1',
    dappRoute: 'THENA-V1',
    TBD_TOKEN: 'N',
    logo: 'https://ipfs.near.social/ipfs/bafkreidps2jipljarabsxbqtiuj6lyupfhvpsesiffmsjzjt4zb73r7qfq',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreidzcztdcx6mez6hhhmhglfv7m7vh45ijgshmikhnforoksmbczlrq',
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
    logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOTkuNyAyMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5OS43IDIwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZBRkFGQTt9DQoJLnN0MXtmaWxsOiNGRkFGMUQ7fQ0KCS5zdDJ7ZmlsbDojMTYxNjE2O30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTE3LjEsMjAwdi04Mi4yYzE5LjYsMi4xLDMyLjksMTEuMSwzMi45LDExLjFsMTIuNS0xNC4xYy0yMC41LTE0LjYtNTAuOS0xNS4yLTUwLjktMTUuMmwtNS01NS4yDQoJYzMuMy0yLjIsNS41LTUuOSw1LjUtMTAuMmMwLTYuNy01LjUtMTIuMi0xMi4yLTEyLjJzLTEyLjIsNS41LTEyLjIsMTIuMmMwLDQuMywyLjIsOC4xLDUuNSwxMC4ybC01LDU1LjJjMCwwLTMwLjQsMC41LTUwLjksMTUuMg0KCWwxMi41LDE0LjFjMCwwLDEzLjMtOSwzMi45LTExLjFWMjAwQzYuMSwxNDMuMi0wLjIsNjAuNywwLDMzLjNjMC01LjcsMy40LTEwLjksOC42LTEzLjJDMjMuOSwxMy4zLDU4LjgsMCw5OS44LDANCgljNDEsMCw3NS45LDEzLjMsOTEuMiwyMC4xYzUuMiwyLjMsOC42LDcuNSw4LjYsMTMuMkMxOTkuOCw2MC43LDE5My41LDE0My4yLDExNy4xLDIwMHoiLz4NCjwvc3ZnPg0K',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreieikyrqroy4j272w2w3cwa2ehswvpmmcmdyf6yyfjzaqnynsqh64a',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreibo6w6552c3xwppsaqmnfku4pforczds45ueibsrt34zj2xcpi76u',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreifjliccmtazc7sfzf3b45jyxpuabbhyqf4rt4ylensgbzc2nlbsru',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreiavgtnnawec2d3xyum2osccpaotv4ivp6k77nuyaun5b6cp646viy',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreig3pzndzzb7zl7nrftklr2mxamzg5h76tcfth2aj3bwle7l44ylx4',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreiczb5evv63erkpwoozxb6qmbwat63ywebt2pdlctc6gey4cqp2ln4',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreidgayoqzg4kqxz6eag4eridejkx3rszflfwbnitfqfohlmpk54w3i',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreigpb3scxgcvddqzongudv3m77bh363rzyxidzuudk6wx32qa6vgia',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreidtzrrtkb7xbr6trlgir7mg3icshyeho2y374hosn76fszwuullti',
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

    logo: 'https://ipfs.near.social/ipfs/bafkreida55shh44tqd4ingcunnu6u34g5bm3jugoaasy7a365kutoomjru',

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
    logo: 'https://ipfs.near.social/ipfs/bafkreiaqpbeth37uxmbe6iwqduoad76dncozbuoa3bwgcbcxcmputkuzfu',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreidd6jb57eubtntolotq3f5gzmhy252d5rq2jmg6glr7nuijon3dr4',
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
    logo: 'https://ipfs.near.social/ipfs/bafkreicczubd47v7zr2cln7l3xts66ek77d4m3neqp3j7dl2cjhjcwphwa',
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
