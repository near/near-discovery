import { gnosis } from '@/config/tokens/gnosis';

const basic = {
  name: 'Swapr',
  logo: '/images/apps/swapr.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  100: {
    factoryAddress: '0x5D48C95AdfFD4B40c1AAADc4e08fc44117E02179',
    routerAddress: '0xE43e60736b1cb4a75ad25240E2f9a62Bff65c0C0',
    defaultCurrencies: {
      input: gnosis['weth'],
      output: gnosis['xdai'],
    },
    tokens: [
      gnosis['wxdai'],
      gnosis['gno'],
      gnosis['usdc'],
      gnosis['usdt'],
      gnosis['weth'],
      gnosis['wbtc'],
      gnosis['swpr'],
    ],
  },
};

export { basic, networks };
