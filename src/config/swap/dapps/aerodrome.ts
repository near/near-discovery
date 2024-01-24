import { base } from '@/config/tokens/base';

const basic = {
  name: 'Aerodrome',
  logo: '/images/apps/aerodrome.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AerodromeAmountOut',
};

const networks = {
  8453: {
    factoryAddress: '0x420DD381b31aEf6683db6B902084cB0FFECe40Da',
    routerAddress: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
    defaultCurrencies: {
      input: base['weth'],
      output: base['usdc'],
    },
    tokens: [base['weth'], base['cbeth'], base['aero'], base['usdc'], base['dai']],
  },
};

export { basic, networks };
