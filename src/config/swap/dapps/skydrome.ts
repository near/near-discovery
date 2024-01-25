import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Skydrome',
  logo: '/images/apps/',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ChronosV1AmountOut',
};
const networks = {
  534352: {
    factoryAddress: '0x2516212168034b18a0155FfbE59f2f0063fFfBD9',
    routerAddress: '0xAA111C62cDEEf205f70E6722D1E22274274ec12F',
    defaultCurrencies: {
      input: scroll['weth'],
      output: scroll['usdt'],
    },
    tokens: [scroll['usdt'], scroll['weth'], scroll['usdc'], scroll['wbtc'], scroll['sky']],
  },
};

export { basic, networks };
