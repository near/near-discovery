import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'Velocore V1',
  logo: 'https://ipfs.near.social/ipfs/bafkreiavgtnnawec2d3xyum2osccpaotv4ivp6k77nuyaun5b6cp646viy',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ChronosV1AmountOut',
};
const networks = {
  324: {
    factoryAddress: '0xE140EaC2bB748c8F456719a457F26636617Bb0E9',
    routerAddress: '0xF29Eb540eEba673f8Fb6131a7C7403C8e4C3f143',
    defaultCurrencies: {
      input: zkSync['weth'],
      output: zkSync['usdc'],
    },
    tokens: [
      zkSync['weth'],
      zkSync['usdc'],
      zkSync['vc'],
      zkSync['waifu'],
      zkSync['zch'],
      zkSync['keyvc'],
      zkSync['lsd'],
      zkSync['cebusd'],
    ],
  },
};

export { basic, networks };
