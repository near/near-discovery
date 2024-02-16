
const basic = {
  name: 'arrakis-finance',
  logo: 'https://ipfs.near.social/ipfs/bafkreibgmu62fb5o3n3s54srlzyf7ppn2c42racp5q3gnukcjgkfwkzuse',
  amountOutFn: 'bluebiu.near/widget/Liquidity.ARRAKISFINANCE',
  ICON_VAULT_MAP: {
    'THALES': 'https://assets.dex.guru/icons/0x217d47011b23bb961eb6d93ca9945b7501a5bb11-optimism.png',
    'WETH': 'https://assets.dex.guru/icons/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth.png',
    'HAN': 'https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg',
    'OP': 'https://assets.dex.guru/icons/0x4200000000000000000000000000000000000042-optimism.png',
    'LYRA': 'https://assets.dex.guru/icons/0x50c5725949a6f0c72e6c4a641f24049a917db0cb-optimism.png',
  }
};
const networks = {
  // op
  10: {
    ALL_DATA_URL: 'https://indexer.api.arrakis.finance/api/vault/all?version=V1&networks=optimism&sortDirection=desc&sort=tvl',
    // USER_DATA_BASE: 'https://wire2.gamma.xyz/optimism/user/',
    // LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/uniswap/optimism/hypervisors/lastSnapshot',
    pairs: [{
      id: "THALES/WETH",
      strategy: "Balanced",
      strategy2: "",
      token0: "THALES",
      token1: "WETH",
    }, {
      id: "WETH/HAN",
      strategy: "Balanced",
      strategy2: "",
      token0: "WETH",
      token1: "HAN",
    }, {
      id: "WETH/OP",
      strategy: "Balanced",
      strategy2: "",
      token0: "WETH",
      token1: "OP",
    }, {
      id: "WETH/LYRA",
      strategy: "Balanced",
      strategy2: "",
      token0: "WETH",
      token1: "LYRA",
    }],
    addresses: {
      "THALES": "0x217d47011b23bb961eb6d93ca9945b7501a5bb11",
      "WETH": "0x4200000000000000000000000000000000000006",
      "HAN": "0x50bce64397c75488465253c0a034b8097fea6578",
      "OP": "0x4200000000000000000000000000000000000042",
      "LYRA": "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",

      "THALES/WETH": "0xac6705BC7f6a35eb194bdB89066049D6f1B0B1b5",
      "WETH/HAN": "0x3fa8CEE6795220Ac25DD35D4d39ec306a3e4fb3f",
      "WETH/OP": "0xD1DCE56F7D8300D43d8b7d3b67650ddF9b2CAF54",
      "WETH/LYRA": "0x70535C46ce04181adf749f34B65B6365164d6B6E",
    },
  },
};

export default { basic, networks };
