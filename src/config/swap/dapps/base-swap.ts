import { base } from '@/config/tokens/base';

const basic = {
  name: 'BaseSwap',
  logo: '/images/apps/base-swap.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};

const networks = {
  8453: {
    factoryAddress: '0xFDa619b6d20975be80A10332cD39b9a4b0FAa8BB',
    routerAddress: '0x327Df1E6de05895d2ab08513aaDD9313Fe505d86',
    defaultCurrencies: {
      input: base['eth'],
      output: base['axlusdc'],
    },
    tokens: [base['eth'], base['axlusdc'], base['cbeth'], base['weth'], base['bswap'], base['dai'], base['usdbc']],
  },
};

export { basic, networks };
