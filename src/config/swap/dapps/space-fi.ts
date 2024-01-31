import { zkSync } from '@/config/tokens/zkSync';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'SpaceFi',
  logo: '/images/apps/space-fi.png',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  324: {
    factoryAddress: '0x0700Fb51560CfC8F896B2c812499D17c5B0bF6A7',
    routerAddress: '0xbE7D1FD1f6748bbDefC4fbaCafBb11C6Fc506d1d',
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdc'],
    },
    tokens: [
      zkSync['eth'],
      zkSync['usdc'],
      zkSync['wbtc'],
      zkSync['space'],
      zkSync['cebnb'],
      zkSync['usdt'],
      zkSync['cebusd'],
    ],
  },
  534352: {
    factoryAddress: '0x6cC370Ed99f1C11e7AC439F845d0BA6aed55cf50',
    routerAddress: '0x18b71386418A9FCa5Ae7165E31c385a5130011b6',
    defaultCurrencies: {
      input: scroll['weth'],
      output: scroll['usdc'],
    },
    tokens: [
      scroll['weth'],
      scroll['usdc'],
      scroll['usdt'],
      scroll['lusd'],
      scroll['reth'],
      scroll['aave'],
      scroll['crv'],
      scroll['wbtc'],
    ],
  },
};

export { basic, networks };
