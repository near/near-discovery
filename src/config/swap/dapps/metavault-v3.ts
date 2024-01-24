import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Metavault V3',
  logo: '/images/apps/',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.RamsesV2AmountOut',
};
const networks = {
  534352: {
    factoryAddress: '0x9367c561915f9D062aFE3b57B18e30dEC62b8488',
    routerAddress: '0xC6433c65ED684e987287d4DE87869a0A7cc4C2eB',
    quoterAddress: '0x63A8A929fA175667832329dee1Bc4c4922AfFe6d',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: scroll['weth'],
      output: scroll['usdt'],
    },
    tokens: [scroll['usdt'], scroll['weth'], scroll['usdc'], scroll['lusd'], scroll['wbtc']],
  },
};

export { basic, networks };
