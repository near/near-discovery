import type { Token } from '@/types';

export const dapps = [
  {
    name: 'Agni Finance',
    dappRoute: '/dapp/agni-finance',
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
    dappRoute: '/dapp/agni-finance',
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
    dappRoute: '/dapp/fusionx-v3',
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
    dappRoute: '/dapp/iziswap',
    TBD_TOKEN: 'N',
    description: 'A Multi-chain DeFi Protocol Providing One-Stop Liquidity as a Service', // dapp radar
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [5000, 59144], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 5000,
    logo: 'https://ipfs.near.social/ipfs/bafkreictpy7n6edfe5boqidwwowccjv4cppterjxtp3ou3wdxagl6adiou',
    dappSrc: {
      5000: 'dapdapbos.near/widget/DappEntry.MantleSwap',
      59144: 'dapdapbos.near/widget/DappEntry.LineaSwap',
    } as { [key: number]: string },
    icon: 'https://ipfs.near.social/ipfs/bafkreifsgwu2zd6y2n5alekr5qgdhzoivlkl5wujtq3z7gnm5pw4jy7sgi',
  },

  {
    name: 'Syncswap',
    dappRoute: '/dapp/Syncswap',
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
    dappRoute: '/dapp/apeswap',
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
    dappRoute: '/dapp/baseSwap',
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
    dappRoute: '/dapp/Synthswap',
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
    dappRoute: '/dapp/SwapBased',
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
    dappRoute: '/dapp/rocketswap',
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
    dappRoute: '/dapp/biSwap',
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
    dappRoute: '/dapp/THENA-V1',
    TBD_TOKEN: 'N',
    logo: 'https://ipfs.near.social/ipfs/bafkreid3zf4c6chl56k3zz53u6jajnhgha3c5trrixgczmzpqpedhkhfxe',
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
    dappRoute: '/dapp/orion',
    TBD_TOKEN: 'N',
    logo: 'https://ipfs.near.social/ipfs/bafkreid76v6okuhmrsj7qztgnvnxedob3ibrttwiaivnxaxptnow23y6t4',
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
    dappRoute: '/dapp/camelot',
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
    dappRoute: '/dapp/chronos-v1',
    TBD_TOKEN: 'N',
    logo: 'https://ipfs.near.social/ipfs/bafkreibmy53ll3pjjs2ts7lvhlmcsoaped5qipdai3dgyb4xx3uxksdtlm',
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
    dappRoute: '/dapp/Spartadex',
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
    dappRoute: '/dapp/SpaceFi',
    TBD_TOKEN: 'N',
    logo: 'https://ipfs.near.social/ipfs/bafkreihlykr7jjajj4ddm6uxxu3n44n2p7s4cc2issd46fnr37kwco7alu',
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
    dappRoute: '/dapp/Velocore-V1',
    logo: 'https://ipfs.near.social/ipfs/bafkreifeodttoaen6redxzqxz7jvqdmsnmncsnrmjxtxgporsacy4ku6ea',
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
    dappRoute: '/dapp/veSync',
    TBD_TOKEN: 'N',
    logo: 'https://ipfs.near.social/ipfs/bafkreigwgzvlmztx4a4z4qcwyrxof23gghs7zl4ujqqztgmezgydnsgape',
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
    dappRoute: '/dapp/ramses-v1',
    TBD_TOKEN: 'N',
    description: 'The native liquidity layer on Arbitrum',
    tags: ['Dexes'],
    logo: 'https://ipfs.near.social/ipfs/bafkreicod5xxs5sirml6rgxrrhqbc4vlsusedr7t4semrmdaloqukxjs6a',
    type: 'dex',
    on_chain_ids: [42161], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 42161,
    dappSrc: {
      42161: 'dapdapbos.near/widget/DappEntry.ArbitrumSwap',
    } as { [key: number]: string },
  },

  {
    name: 'Ramses V2',
    dappRoute: '/dapp/ramses-v2',
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
    dappRoute: '/dapp/honeyswap',
    TBD_TOKEN: 'N',
    logo: 'https://ipfs.near.social/ipfs/bafkreiekp7osfgpzfcboawj7yj3mirxxaxwcbvdkb5mgpbui6boz47dhoy',
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
    name: 'HorizonDEX',
    dappRoute: '/dapp/horizonDEX',
    TBD_TOKEN: 'N',
    logo: 'https://ipfs.near.social/ipfs/bafkreiekp7osfgpzfcboawj7yj3mirxxaxwcbvdkb5mgpbui6boz47dhoy',
    description: 'All current DEXs on BASE & LINEA are built on the standard Uniswap-V2 model.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [8453, 59144], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 8453,
    dappSrc: {
      8453: 'dapdapbos.near/widget/DappEntry.BaseSwap',
      137: 'dapdapbos.near/widget/DappEntry.LineaSwap',
    } as { [key: number]: string },
  },

  {
    name: 'PearlFi',
    dappRoute: '/dapp/pearlFi',
    logo: 'https://ipfs.near.social/ipfs/bafkreihltljvxhpi7zszyc67wsinxzcj2fakufti6koeoelst74av7j4eq',
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
    dappRoute: '/dapp/quickSwap',
    TBD_TOKEN: 'N',
    logo: 'https://ipfs.near.social/ipfs/bafkreibox4d5bhaw2hvgf4m42acvuvzbmdaufoy53grhffyuaz5pafcbse',
    description: 'QuickSwap is a next-generation layer-2 decentralized exchange and Automated Market Maker.',
    tags: ['Dexes'],
    type: 'dex',
    on_chain_ids: [137, 1101], // get chain config from chains.ts, TODO:
    DEFAULT_CHAIN_ID: 137,
    dappSrc: {
      137: 'dapdapbos.near/widget/DappEntry.PolygonSwap',
      // TODO:
    } as { [key: number]: string },
  },

  {
    name: 'Retro',
    dappRoute: '/dapp/retro',
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
    dappRoute: '/dapp/maia-v3',
    logo: 'https://ipfs.near.social/ipfs/bafkreibdq7fvaobgp6tuna5k2s7u43mkecy4jeumbfw3lgwrd2ft2uftoe',
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
    dappRoute: '/dapp/netswap',
    logo: 'https://ipfs.near.social/ipfs/bafkreicoh23atiwall72voi6xchtqq4cmvfm2z5ge257ynw5hvkspyod2e',
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
    name: 'Balancer',
    dappRoute: '/dapp/balancer', //TODO:
    logo: 'https://ipfs.near.social/ipfs/bafkreie7ikpsbxhjkvwuhwhfyt7exssk7m36wnjdeasnvpxn4lzxjeq4da',
    TBD_TOKEN: 'N',
    description:
      'A decentralized automated market maker (AMM) protocol built on Ethereum that represents a flexible building block for programmable liquidity.',
    tags: ['Dexes'],
    // type: 'dex',
    on_chain_ids: [1101], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 1101,

    extendProps: {
      defaultDex: 'Balancer',
    },
    dappSrc: {
      1101: 'guessme.near/widget/ZKEVMSwap.zkevm-swap',
    } as { [key: number]: string },
  },
  {
    name: 'Pancake Swap',
    dappRoute: '/dapp/pancake-swap',
    logo: 'https://ipfs.near.social/ipfs/bafkreiag326f7l2dfyoy7iivyr27e34ockcu5yktb75xvz2ppnn5dfyap4',
    TBD_TOKEN: 'N',
    description: 'PancakeSwap helps you make the most out of your crypto in three ways: Trade, Earn, and Win.',
    tags: ['Dexes'],
    // type: 'dex', //TODO:
    on_chain_ids: [1101], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 1101,
    extendProps: {
      defaultDex: 'Pancake Swap',
    },
    dappSrc: {
      1101: 'guessme.near/widget/ZKEVMSwap.zkevm-swap',
    } as { [key: number]: string },
  },

  {
    name: '0vix',
    dappRoute: 'bluebiu.near/widget/Polygon.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: '0vix',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreidhzpw4f3j2ufxxnqapfc4zyeythbds4uop44dbgnfnk2ymqgp7aa',
    TBD_TOKEN: 'Y',
    description: '0VIX is a Decentralized Finance (DeFi) liquidity market protocol, built on Polygon.',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [137, 1101], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 137,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'Agave',
    dappRoute: 'bluebiu.near/widget/Gnosis.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'Agave',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreicagi5msm7flwzqkgemb6odyx6r4jbhnvrhustzyuboznh6rr6bbu',
    TBD_TOKEN: 'N',
    description: 'Agave, in a few words, is Aave on xDai.',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [100], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 100,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'Benqi',
    dappRoute: 'bluebiu.near/widget/Avalanche.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'Benqi',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreibwn7ekxtgnkczolfnwpjemz4hdm27mftcnd4yqjocvdvlw7nb4sm',
    TBD_TOKEN: 'N',
    description: 'The DeFi and Web3 protocol for all.',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [43114], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 43114,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'C.R.E.A.M.',
    dappRoute: 'bluebiu.near/widget/Arbitrum.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'C.R.E.A.M.',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreig6xa6pd2za7xxssj5ul7xfx7mvfayjnqvxvxgmv6hgeb6pya43cm',
    TBD_TOKEN: 'N',
    description:
      'C.R.E.A.M. Finance is a decentralized lending protocol for individuals and protocols to access financial services. ',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [42161, 56, 137], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 42161,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'Granary Finance',
    dappRoute: 'bluebiu.near/widget/Avalanche.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'Granary Finance',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreiaudgxte56nl6eedzg6inp4w3xobp25chpayt3ojuiblhzkzgsifq',
    TBD_TOKEN: 'Y',
    description:
      'Granary Finance is a decentralized, user-driven borrowing and lending liquidity market inspired by Aave.',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [43114, 8453, 42161, 56, 10], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 43114,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'Iron Bank',
    dappRoute: 'bluebiu.near/widget/Avalanche.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'Iron Bank',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreibj5orc77anv4ys5dpallk4u27e52gvosxcdbcm5curxlw3ffmhsy',
    TBD_TOKEN: 'N',
    description: 'A Decentralized Lending Platform focused on Capital Efficiency',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [43114, 10], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 43114,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'LayerBank',
    dappRoute: 'bluebiu.near/widget/Linea.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'LayerBank',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreidqfdregtnl6vbpuvdp5g2fvekuz24zti4owzgjzkgz5n7nfmoafq',
    TBD_TOKEN: 'N',
    description: 'The Ultimate Money Market for All EVM-Layers',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [59144], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 59144,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'Lendle',
    dappRoute: 'bluebiu.near/widget/Mantle.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'Lendle',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreih5p5podfnagabzxizmsje2y2qhccfjspxuvgkcexkunqsy7v7j64',
    TBD_TOKEN: 'N',
    description: 'Earn interest on your cryptos with the #1 lending and borrowing platform on Mantle Network',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [5000], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 5000,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'Moonwell',
    dappRoute: 'bluebiu.near/widget/Base.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'Lendle',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreih2qmod4k2buqgbg4yayyo4t353za2tknxw5xb272x4fekqtbwjve',
    TBD_TOKEN: 'N',
    description:
      'Moonwell is an open and decentralized lending and borrowing protocol built on Base, Moonbeam, and Moonriver. ',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [8453], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 8453,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'mendi finance',
    dappRoute: 'bluebiu.near/widget/Linea.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'mendi finance',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreifziawsf2l5nvz5eak2csyhp3ln7ldij53clfaxptbx7353uwone4',
    TBD_TOKEN: 'N',
    description:
      'Mendi Finance is a decentralized lending protocol for individuals, institutions and protocols to access financial services. ',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [59144], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 59144,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'Radiant',
    dappRoute: 'bluebiu.near/widget/Arbitrum.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'Radiant',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreihivtnhg2bi44rrmuxyefnobbqnons23ha5bwzekfqatew4z2bda4',
    TBD_TOKEN: 'N',
    description: 'Earn Interest & Borrow Assets Cross-Chain, Seamlessly',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [42161, 56], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 42161,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'Reactorfusion',
    dappRoute: 'bluebiu.near/widget/zkSync.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'Reactorfusion',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreicvlu4cwvtx6vwasc2vzzfnkmmkgrwn34zk42mogacvklxh3yav7e',
    TBD_TOKEN: 'N',
    description: 'ReactorFusion is a decentralized, non-custodial lending protocol.',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [324], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 324,
    dappSrc: {} as { [key: number]: string },
  },
  {
    name: 'Sonne',
    dappRoute: 'bluebiu.near/widget/Optimism.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'Sonne',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreida3sat55yql3apjhngucnilyf7qck6ji32pekkoc2rrg4habf4va',
    TBD_TOKEN: 'N',
    description:
      'Sonne Finance is a decentralized lending protocol for individuals, institutions and protocols to access financial services.',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [10, 8453], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 10,
    dappSrc: {} as { [key: number]: string },
  },
  {
    name: 'Venus',
    dappRoute: 'bluebiu.near/widget/Bsc.All-in-one?defaultTab=Lending', //TODO:
    extendProps: {
      defaultDapp: 'Venus',
      defaultTab: 'Lending',
    },
    logo: 'https://ipfs.near.social/ipfs/bafkreib4zhl7kkpllunevcepxzmrge75halcj57th7ksxkpf5bqcxzciy4',
    TBD_TOKEN: 'N',
    description: 'Simple and powerful community-driven finance for the entire globe.',
    tags: ['Lending'],
    type: 'lending',
    on_chain_ids: [56], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 56,
    dappSrc: {} as { [key: number]: string },
  },

  {
    name: 'Pendle',
    dappRoute: '/dapp/pendle', //TODO:
    logo: 'https://ipfs.near.social/ipfs/bafkreiedaqqpcuw6oj5mao263fizx3gksybdmw5x2p7xeka7wngzip5zeu',
    TBD_TOKEN: 'N',
    description:
      'Pendle is a permissionless yield-trading protocol where users can execute various yield-management strategies.',
    tags: ['Yield'],
    type: 'yield',
    on_chain_ids: [42161], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 42161,
    dappSrc: {
      42161: 'bluebiu.near/widget/Arbitrum.Pendle.TradeMarkets',
    } as { [key: number]: string },
  },

  {
    name: 'Gamma',
    dappRoute: 'bluebiu.near/widget/Linea.Liquidity.GAMMA', //TODO:
    logo: 'https://ipfs.near.social/ipfs/bafkreigq2itome7z2xktsxcxsitqkqsdtaulnyhu2z4ekc6udecl7ihfhi',
    TBD_TOKEN: 'N',
    description: 'A protocol for active liquidity management and market making strategies',
    tags: ['Liquidity'],
    type: 'liquidity',
    on_chain_ids: [59144, 5000, 1101], // get chain config from chains.ts
    DEFAULT_CHAIN_ID: 59144,
    dappSrc: {} as { [key: number]: string },
  },
];
