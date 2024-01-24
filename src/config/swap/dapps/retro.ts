import { polygon } from '@/config/tokens/polygon';

const basic = {
  name: 'Retro',
  logo: '/images/apps/retro.png',
  amountOutFn: 'bluebiu.near/widget/Mantle.Swap.AgniFinanceAmountOut',
};
const networks = {
  137: {
    factoryAddress: '0x91e1B99072f238352f59e58de875691e20Dc19c1',
    routerAddress: '0x1891783cb3497Fdad1F25C933225243c2c7c4102',
    quoterAddress: '0xddc9Ef56c6bf83F7116Fad5Fbc41272B07ac70C1',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: polygon['eth'],
      output: polygon['usdc'],
    },
    tokens: [
      polygon['eth'],
      polygon['usdc'],
      polygon['mai'],
      polygon['wmatic'],
      polygon['cash'],
      polygon['usdt'],
      polygon['retro'],
    ],
  },
};

export { basic, networks };
