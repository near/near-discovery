import { gnosis } from '@/config/tokens/gnosis';

const basic = {
  name: 'Elk',
  logo: '/images/apps/elk.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.ElkAmountOut',
};
const networks = {
  100: {
    factoryAddress: '0xCB018587dA9590A18f49fFE2b85314c33aF3Ad3B',
    routerAddress: '0xe5759714998e8B50A33c7333C04C2d02e5dcE77f',
    defaultCurrencies: {
      input: gnosis['wxdai'],
      output: gnosis['usdc'],
    },
    tokens: [
      gnosis['wxdai'],
      gnosis['usdc'],
      gnosis['usdt'],
      gnosis['wbtc'],
      gnosis['dai'],
      gnosis['gno'],
      gnosis['elk'],
    ],
  },
};

export { basic, networks };
