import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'Mute',
  logo: '/images/apps/mute.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.Mute',
};
const networks = {
  324: {
    factoryAddress: '0x40be1cBa6C5B47cDF9da7f963B6F761F4C60627D',
    routerAddress: '0x8B791913eB07C32779a16750e3868aA8495F5964',
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
};

export { basic, networks };
