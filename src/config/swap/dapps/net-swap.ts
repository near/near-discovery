import { metis } from '@/config/tokens/metis';

const basic = {
  name: 'Netswap',
  logo: '/images/apps/net-swap.png',
  amountOutFn: 'bluebiu.near/widget/Metis.Swap.NetSwapAmountOut',
};
const networks = {
  1088: {
    factoryAddress: '0x70f51d68D16e8f9e418441280342BD43AC9Dff9f',
    routerAddress: '0x1E876cCe41B7b844FDe09E38Fa1cf00f213bFf56',
    defaultCurrencies: {
      input: metis['eth'],
      output: metis['m.usdc'],
    },
    tokens: [
      metis['eth'],
      metis['m.usdc'],
      metis['hera'],
      metis['usdt'],
      metis['metis'],
      metis['nett'],
      metis['peak'],
      metis['byte'],
    ],
  },
};

export { basic, networks };