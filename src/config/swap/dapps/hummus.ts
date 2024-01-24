import { metis } from '@/config/tokens/metis';

const basic = {
  name: 'Hummus',
  logo: '/images/apps/hummus.png',
  amountOutFn: 'bluebiu.near/widget/Metis.Swap.HummusExchangeAmountOut',
};
const networks = {
  1088: {
    routerAddress: '0x95B4F64c2a96F770C1b4216e18ED692C01506437',
    defaultCurrencies: {
      input: metis['weth'],
      output: metis['m.usdc'],
    },
    tokens: [metis['weth'], metis['m.usdc'], metis['m.usdt'], metis['m.dai'], metis['m.wbtc'], metis['metis']],
    pools: [
      [
        [metis['m.dai'].address, metis['usdt'].address, metis['m.usdc'].address],
        '0xa35ad1b31059a652c2bad1114604845469b86692000000000000000000000006',
      ],
      [
        [metis['eth'].address, metis['m.wbtc'].address, metis['metis'].address, metis['m.usdc'].address],
        '0x9c531f76b974fe0b7f545ba4c0623dd2fea3ef26000100000000000000000002',
      ],
    ],
  },
};

export { basic, networks };
