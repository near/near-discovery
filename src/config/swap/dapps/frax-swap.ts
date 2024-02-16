import { optimism } from '@/config/tokens/optimism';
const basic = {
  name: 'Frax Swap',
  logo: '/images/apps/frax.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  10: {
    factoryAddress: '0x67a1412d2D6CbF211bb71F8e851b4393b491B10f',
    routerAddress: '0xB9A55F455e46e8D717eEA5E47D2c449416A0437F',
    defaultCurrencies: {
      input: optimism['weth'],
      output: optimism['frax'],
    },
    tokens: [optimism['weth'], optimism['frax'], optimism['fxs']],
  },
};

export { basic, networks };
