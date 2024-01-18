import { avalanche } from '@/config/tokens/avalanche';

const basic = {
  name: 'Pharaoh',
  logo: 'https://ipfs.near.social/ipfs/bafkreictkr54jtz4rb3qk3bxdts2rvj37ngi4bi3hsghqubkhalxdojp3i',
  amountOutFn: 'bluebiu.near/widget/Mantle.Swap.AgniFinanceAmountOut',
};
const networks = {
  43114: {
    factoryAddress: '0xAAA32926fcE6bE95ea2c51cB4Fcb60836D320C42',
    routerAddress: '0xAAAE99091Fbb28D400029052821653C1C752483B',
    quoterAddress: '0xAAAbFD1E45Cc93d16c2751645e50F2594bE12680',
    fees: [50, 100, 250, 500, 3000, 10000],
    defaultCurrencies: {
      input: avalanche['eth'],
      output: avalanche['usdc'],
    },
    tokens: [
      avalanche['avax'],
      avalanche['wavax'],
      avalanche['usdc'],
      avalanche['usdt'],
      avalanche['usdc.e'],
      avalanche['usdt.e'],
      avalanche['phar'],
      avalanche['dai.e'],
      avalanche['eth'],
      avalanche['btc.b'],
      avalanche['wbtc.e'],
    ],
  },
};

export { basic, networks };
