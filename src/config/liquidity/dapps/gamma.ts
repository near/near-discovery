import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Gamma',
  logo: 'https://ipfs.near.social/ipfs/bafkreibgmu62fb5o3n3s54srlzyf7ppn2c42racp5q3gnukcjgkfwkzuse',
  amountOutFn: 'bluebiu.near/widget/Liquidity.Gamma',
  ICON_VAULT_MAP: {
    USDC: 'https://app.gamma.xyz/_next/static/media/icon.4435c0e9.svg',
    WETH: 'https://app.gamma.xyz/_next/static/media/icon.dddcef40.svg',
    USDT: 'https://app.gamma.xyz/_next/static/media/icon.16fadc1b.svg',
    WBTC: 'https://app.gamma.xyz/_next/static/media/icon.eb6c5d98.svg',
    BUSD: 'https://app.gamma.xyz/_next/static/media/icon.6be491a5.svg',
    MATIC: 'https://app.gamma.xyz/_next/static/media/icon.fe758f26.svg',
    WBNB: 'https://app.gamma.xyz/_next/static/media/icon.ca2e2bd7.svg',
    BTCB: 'https://app.gamma.xyz/_next/static/media/icon.eb6c5d98.svg',
    BNBx: 'https://app.gamma.xyz/_next/static/media/icon.ca2e2bd7.svg',
    OP: '	https://app.gamma.xyz/_next/static/media/icon.3468b9ee.svg',
    SNX: 'https://app.gamma.xyz/_next/static/media/icon.b8aa30c1.svg',
    ERN: 'https://app.gamma.xyz/_next/static/media/icon.5571c161.svg',
  }
};
const networks = {
  // base
  8453: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/sushi/base/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/sushi/base/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/sushi/base/hypervisors/lastSnapshot',
    pairs: [{
      id: "WETH-USDbC-500",
      strategy: "Dynamic",
      strategy2: "",
      token0: "USDC",
      token1: "WETH",
      ammName: 'Sushi',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.615337dd.svg'
    }],
    addresses: {
      USDC: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
      WETH: "0x4200000000000000000000000000000000000006",
      "WETH-USDbC-500": "0x11c4011772594c5f124a027da35329559447853d",
    }
  },
  // bsc
  56: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/thena/bsc/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/thena/bsc/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/thena/bsc/hypervisors/lastSnapshot',
    pairs: [{
      id: "ETH-WBNB-0",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WETH",
      token1: "WBNB",
      ammName: 'Thena',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ddeeba67.svg'
    }, {
      id: "USDT-USDC-0",
      strategy: "Dynamic",
      strategy2: "Stable",
      token0: "USDT",
      token1: "USDC",
      ammName: 'Thena',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ddeeba67.svg'
    }, {
      id: "USDT-WBNB-0",
      strategy: "Dynamic",
      strategy2: "Stable",
      token0: "USDT",
      token1: "WBNB",
      ammName: 'Thena',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ddeeba67.svg'
    }, {
      id: "BNBx-WBNB-0",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "BNBx",
      token1: "WBNB",
      ammName: 'Thena',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ddeeba67.svg'
    }],
    addresses: {
      WETH: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
      WBNB: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      BTCB: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
      USDT: "0x55d398326f99059ff775485246999027b3197955",
      USDC: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      BNBx: "0x1bdd3cf7f79cfb8edbb955f20ad99211551ba275",

      "ETH-WBNB-0": "0x10bf6e7b28b1cffb1c047d7f815953931e5ee947",
      "BTCB-WBNB-0": "0xbd2383816bab04e46b69801cca7e92d34ab94d3f",
      "USDT-USDC-0": "0x1f3b5c57558862e663bf169ed2fa093a0399decd",
      "USDT-WBNB-0": "0x3ec1ffd5dc29190588608ae9fd4f93750e84cda2",
      "BNBx-WBNB-0": "0x2ecbd508c00bbc8aa0cdc9100bf3956fcabe7677"
    }
  },
  // op
  10: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/optimism/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/optimism/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/uniswap/optimism/hypervisors/lastSnapshot',
    pairs: [{
      id: "WETH-OP-3000",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WETH",
      token1: "OP",

      ammName: 'Uniswap',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.3afe0f51.svg'
    }, {
      id: "WETH-WBTC-500",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WETH",
      token1: "WBTC",
      ammName: 'Uniswap',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.3afe0f51.svg'
    }, {
      id: "WETH-SNX-3000",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WETH",
      token1: "SNX",
      ammName: 'Uniswap',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.3afe0f51.svg'
    }, {
      id: "OP-USDC-3000",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "OP",
      token1: "USDC",
      ammName: 'Uniswap',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.3afe0f51.svg'
    }, {
      id: "USDC-ERN-500",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "USDC",
      token1: "ERN",
      ammName: 'Uniswap',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.3afe0f51.svg'
    }],
    addresses: {
      WETH: "0x4200000000000000000000000000000000000006",
      OP: "0x4200000000000000000000000000000000000042",
      WBTC: "0x68f180fcce6836688e9084f035309e29bf0a2095",
      SNX: "0x8700daec35af8ff88c16bdf0418774cb3d7599b4",
      USDC: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
      ERN: "0xc5b001dc33727f8f26880b184090d3e252470d45",

      "WETH-OP-3000": "0xbcfa4cfa97f74a6abf80b9901569bbc8654f4315",
      "WETH-WBTC-500": "0x34d4112d180e9faf06f77c8c550ba20c9f61ae31",
      "WETH-SNX-3000": "0x1392698b2f2ca87e6329c1ca502c5d4ba938d1b8",
      "OP-USDC-3000": "0x2102bef0d9727ea50ba844e7658e38480961835c",
      "USDC-ERN-500": "0xd3c480ec7a47596ff8d63396227d1f7dc728a7f0"
    }
  },
  // polygon
  137: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/quickswap/polygon/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/quickswap/polygon/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/quickswap/polygon/hypervisors/lastSnapshot',
    pairs: [{
      id: "WBTC-WETH-0",
      strategy: "Dynamic",
      strategy2: "Narrow",
      token0: "WBTC",
      token1: "WETH",
      ammName: 'QuickSwap',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
    }],
    addresses: {
      WBTC: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
      WETH: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      "WBTC-WETH-0": "0x4b9e26a02121a1c541403a611b542965bd4b68ce",
      "USDC-WETH-0": "0x3cc20a6795c4b57d9817399f68e83e71c8626580",
    }
  },
  // Linea
  59144: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/lynex/linea/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/lynex/linea/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/lynex/linea/hypervisors/lastSnapshot',
    pairs: [
      {
        id: "N USDC-WETH-0",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "USDC",
        token1: "WETH",
        ammName: 'Lynex',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.d7465888.svg'
      },
      {
        id: "S BUSD-USDT-0",
        strategy: "Dynamic",
        strategy2: "Stable",
        token0: "BUSD",
        token1: "USDT",
        ammName: 'Lynex',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.d7465888.svg'
      },
      {
        id: "N BUSD-WETH-0",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "BUSD",
        token1: "WETH",
        ammName: 'Lynex',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.d7465888.svg'
      },
      {
        id: "N MATIC-WETH-0",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "MATIC",
        token1: "WETH",
        ammName: 'Lynex',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.d7465888.svg'
      },
      {
        id: "N WBTC-WETH-0",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "WBTC",
        token1: "WETH",
        ammName: 'Lynex',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.d7465888.svg'
      },
      {
        id: "S USDC-BUSD-0",
        strategy: "Dynamic",
        strategy2: "Stable",
        token0: "USDC",
        token1: "BUSD",
        ammName: 'Lynex',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.d7465888.svg'
      },
      {
        id: "N USDT-WETH-0",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "USDT",
        token1: "WETH",
        ammName: 'Lynex',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.d7465888.svg'
      },
    ],
    addresses: {
      USDC: "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
      WETH: "0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f",
      BUSD: "0x7d43aabc515c356145049227cee54b608342c0ad",
      USDT: "0xa219439258ca9da29e9cc4ce5596924745e12b93",
      MATIC: "0x265b25e22bcd7f10a5bd6e6410f10537cc7567e8",
      WBTC: "0x3aab2285ddcddad8edf438c1bab47e1a9d05a9b4",

      "N USDC-WETH-0": "0x0b15a5e3ca0d4b492c3b476d0f807535f9b72079",
      "S BUSD-USDT-0": "0x32e27ff479454e32868ff67ee9f06bafdc1e908f",
      "N BUSD-WETH-0": "0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c",
      "N MATIC-WETH-0": "0x8421c6102ee8a147facc01977df3b159f7921d54",
      "N WBTC-WETH-0": "0x8a9570ec97534277ade6e46d100939fbce4968f0",
      "S USDC-BUSD-0": "0xd6cc4a33da7557a629e819c68fb805ddb225f517",
      "N USDT-WETH-0": "0xf3b1125c8505f038503e002e61a78253610d4f60",
    }
  },
  // mantle
  5000: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/fusionx/mantle/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/fusionx/mantle/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/fusionx/mantle/hypervisors/lastSnapshot',
    addresses: {
      USDT: "0x201eba5cc46d216ce6dc03f6a759e8e766e956ae",
      MINU: "0x51cfe5b1e764dc253f4c8c1f19a081ff4c3517ed",
      WMNT: "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8",
      WBTC: "0xcabae6f6ea1ecab08ad02fe02ce9a44f09aebfa2",
      USDC: "0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9",
      WETH: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",

      "N USDT-WMNT-500": "0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c",
      "W USDT-WMNT-500": "0x1ee3ae551188661553882fdc75f8f62eaa6726ad",

      "N MINU-WMNT-10000": "0xd6cc4a33da7557a629e819c68fb805ddb225f517",
      "W MINU-WMNT-10000": "0xf8a02496bd84bd7f7ab9f1a000044fc482d729ca",

      "N USDT-WETH-500": "0xde7421f870ffb2b99998d9ed07c4d9b22e783922",
      "W USDT-WETH-500": "0xfe4bb996926aca85c9747bbec886ec2a3f510c66",

      "N USDT-WBTC-500": "0x2e18b825b049c4994370b0db6c35d0100295b96c",
      "W USDT-WBTC-500": "0xa18d3073441b0774a1efa45ba9d2e7da3441da2f",

      "W USDC-USDT-100": "0x561f5cf838429586d1f8d3826526891b289270ee",
    },
    pairs: [
      {
        id: "N USDT-WMNT-500",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "USDT",
        token1: "WMNT",
        ammName: 'FusionX',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.a0ab20e5.svg'
      },
      {
        id: "W USDT-WMNT-500",
        strategy: "Dynamic",
        strategy2: "Wide",
        token0: "USDT",
        token1: "WMNT",
        ammName: 'FusionX',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.a0ab20e5.svg'
      },
      {
        id: "N MINU-WMNT-10000",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "MINU",
        token1: "WMNT",
        ammName: 'FusionX',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.a0ab20e5.svg'
      },
      {
        id: "W MINU-WMNT-10000",
        strategy: "Dynamic",
        strategy2: "Wide",
        token0: "MINU",
        token1: "WMNT",
        ammName: 'FusionX',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.a0ab20e5.svg'
      },
      {
        id: "N USDT-WETH-500",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "USDT",
        token1: "WETH",
        ammName: 'FusionX',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.a0ab20e5.svg'
      },

      {
        id: "W USDT-WETH-500",
        strategy: "Dynamic",
        strategy2: "Wide",
        token0: "USDT",
        token1: "WETH",
        ammName: 'FusionX',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.a0ab20e5.svg'
      },

      {
        id: "N USDT-WBTC-500",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "USDT",
        token1: "WBTC",
        ammName: 'FusionX',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.a0ab20e5.svg'
      },

      {
        id: "W USDT-WBTC-500",
        strategy: "Dynamic",
        strategy2: "Wide",
        token0: "USDT",
        token1: "WBTC",
        ammName: 'FusionX',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.a0ab20e5.svg'
      },

      {
        id: "W USDC-USDT-100",
        strategy: "Dynamic",
        strategy2: "Wide",
        token0: "USDC",
        token1: "USDT",
        ammName: 'FusionX',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.a0ab20e5.svg'
      },
    ]
  },
  1101: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/quickswap/polygon-zkevm/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/quickswap/polygon-zkevm/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/quickswap/polygon-zkevm/hypervisors/lastSnapshot',
    addresses: {
      Chef: "0x1e2d8f84605d32a2cbf302e30bfd2387badf35dd",
      DAI: "0xc5015b9d9161dca7e18e32f6f25c4ad850731fd4",
      MATIC: "0xa2036f0538221a77a3937f1379699f44945018d0",
      "N MATIC-USDC": "0x19f4ebc0a1744b93a355c2320899276ae7f79ee5",
      "N USDC-WBTC": "0x9783c45564232c0aff8dc550a9c247c42e8c8b98",
      "N WETH-MATIC": "0x2f39293c9ed046822c014143fb18d5ae0479be93",
      "N WETH-USDC": "0x04c6b11e1ffe1f1032bd62adb343c9d07767489c",
      "N WETH-WBTC": "0x1cc4ee0cb063e9db36e51f5d67218ff1f8dbfa0f",
      USDC: "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
      "USDC-DAI": "0xafad6e114cfbc8a19e91b8d7d04da740a7698595",
      USDT: "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
      "USDT-DAI": "0xcd36b8a47a072e3e05e894b6ec89d294bec3d3ed",
      "USDT-USDC": "0x145d55ae4848f9782efcac785a655e3e5dce1bcd",
      "W MATIC-USDC": "0x8462e4173d63f8769f94bf7ae5bc1ac7ab5d96e3",
      "W USDC-WBTC": "0x83de646a7125ac04950fea7e322481d4be66c71d",
      "W WETH-MATIC": "0x5ada298913d53aa823824de69b4a6e790aed9327",
      "W WETH-USDC": "0xfb3a24c0f289e695ceb87b32fc18a2b8bd896167",
      "W WETH-WBTC": "0x64e78e990b2a45fad8b64b43e62a67d69a156042",
      WBTC: "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",
      WETH: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
      stMATIC: "0x83b874c1e09d316059d929da402dcb1a98e92082",
      "stMATIC-MATIC": "0x9616052273a598bc04bd1ad7f7a753157c24f77e",
    },
    pairs: [
      {
        id: "W WETH-USDC",
        strategy: "Dynamic",
        strategy2: "Wide",
        token0: "WETH",
        token1: "USDC",
        decimals0: 18,
        decimals1: 6,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "N WETH-USDC",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "WETH",
        token1: "USDC",
        decimals0: 18,
        decimals1: 6,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "W WETH-MATIC",
        strategy: "Dynamic",
        strategy2: "Wide",
        token0: "WETH",
        token1: "MATIC",
        decimals0: 18,
        decimals1: 18,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "N WETH-MATIC",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "WETH",
        token1: "MATIC",
        decimals0: 18,
        decimals1: 18,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "W WETH-WBTC",
        strategy: "Dynamic",
        strategy2: "Wide",
        token0: "WETH",
        token1: "WBTC",
        decimals0: 18,
        decimals1: 18,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "N WETH-WBTC",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "WETH",
        token1: "WBTC",
        decimals0: 18,
        decimals1: 18,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "W USDC-WBTC",
        strategy: "Dynamic",
        strategy2: "Wide",
        token0: "USDC",
        token1: "WBTC",
        decimals0: 6,
        decimals1: 18,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "N USDC-WBTC",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "USDC",
        token1: "WBTC",
        decimals0: 6,
        decimals1: 18,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "USDT-USDC",
        strategy: "Stable",
        token0: "USDT",
        token1: "USDC",
        decimals0: 6,
        decimals1: 6,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "USDC-DAI",
        strategy: "Stable",
        token0: "USDC",
        token1: "DAI",
        decimals0: 6,
        decimals1: 18,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "USDT-DAI",
        strategy: "Stable",
        token0: "USDT",
        token1: "DAI",
        decimals0: 6,
        decimals1: 18,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "stMATIC-MATIC",
        strategy: "Pegged Price",
        token0: "stMATIC",
        token1: "MATIC",
        decimals0: 18,
        decimals1: 18,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "N MATIC-USDC",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "MATIC",
        token1: "USDC",
        decimals0: 18,
        decimals1: 6,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
      {
        id: "W MATIC-USDC",
        strategy: "Dynamic",
        strategy2: "Wide",
        token0: "MATIC",
        token1: "USDC",
        decimals0: 18,
        decimals1: 6,
        ammName: 'QuickSwap',
        ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
      },
    ]
  }
};

export default { basic, networks };
