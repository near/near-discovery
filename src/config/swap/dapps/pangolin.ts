import { avalanche } from '@/config/tokens/avalanche';

const basic = {
  name: 'Pangolin',
  logo: 'https://ipfs.near.social/ipfs/bafkreibac4jnqimxtopotve7og6b6h52lrkc735bezazazcvqmf2vl4cme',
  amountOutFn: 'bluebiu.near/widget/Avalanche.Swap.PangolinAmountOut',
};
const networks = {
  43114: {
    factoryAddress: '0xefa94DE7a4656D787667C749f7E1223D71E9FD88',
    routerAddress: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',
    defaultCurrencies: {
      input: avalanche['eth'],
      output: avalanche['usdc.e'],
    },
    tokens: [
      avalanche['avax'],
      avalanche['usdc.e'],
      avalanche['dai.e'],
      avalanche['usdt.e'],
      avalanche['eth'],
      avalanche['wavax'],
      avalanche['wbtc.e'],
    ],
  },
};

export { basic, networks };
