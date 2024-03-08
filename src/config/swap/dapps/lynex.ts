import multicall from '@/config/contract/multicall';
import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Lynex Fi',
  logo: '/images/apps/lynex.png',
  amountOutFn: 'bluebiu.near/widget/PolygonZkevm.Swap.QuickSwapAmountOut',
};
const networks = {
  59144: {
    routerAddress: '0x3921e8cb45B17fC029A0a6dE958330ca4e583390',
    quoterAddress: '0x851d97Fd7823E44193d227682e32234ef8CaC83e',
    multicallAddress: multicall[59144],
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdt'],
    },
    tokens: [linea['usdc'], linea['eth'], linea['weth'], linea['usdt'], linea['wsteth']],
  },
};

export { basic, networks };
