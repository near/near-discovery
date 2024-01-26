import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Ambient',
  logo: '/images/apps/',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmbientAmountOut',
};
const networks = {
  534352: {
    routerAddress: '0xaaaaAAAACB71BF2C8CaE522EA5fa455571A74106',
    quoterAddress: '0xc2c301759B5e0C385a38e678014868A33E2F3ae3',
    defaultCurrencies: {
      input: scroll['eth'],
      output: scroll['usdc'],
    },
    tokens: [scroll['usdt'], scroll['eth'], scroll['usdc'], scroll['wbtc']],
  },
};

export { basic, networks };
