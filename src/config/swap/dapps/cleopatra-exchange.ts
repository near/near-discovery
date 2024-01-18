import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'Cleopatra Exchange',
  logo: 'https://ipfs.near.social/ipfs/bafkreibncghvd7ajh5fdqxzittwyl2bukx32i4fjpr4xzd4aznjs5y2wly',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ChronosV1AmountOut',
};
const networks = {
  5000: {
    factoryAddress: '0xAAA16c016BF556fcD620328f0759252E29b1AB57',
    routerAddress: '0xAAA45c8F5ef92a000a121d102F4e89278a711Faa',
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc'],
    },
    tokens: [
      mantle['usdt'],
      mantle['mnt'],
      mantle['wmnt'],
      mantle['weth'],
      mantle['usdc'],
      mantle['cleo'],
      mantle['lusd'],
    ],
  },
};

export { basic, networks };
