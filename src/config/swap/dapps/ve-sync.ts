import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'veSync',
  logo: 'https://ipfs.near.social/ipfs/bafkreig3pzndzzb7zl7nrftklr2mxamzg5h76tcfth2aj3bwle7l44ylx4',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ChronosV1AmountOut',
};
const networks = {
  324: {
    factoryAddress: '0x529Bd7Fc43285B96f1e8d5158626d1F15bb8A834',
    routerAddress: '0x6C31035D62541ceba2Ac587ea09891d1645D6D07',
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdt'],
    },
    tokens: [
      zkSync['eth'],
      zkSync['usdt'],
      zkSync['usdc'],
      zkSync['usx'],
      zkSync['iusd'],
      zkSync['slusdt'],
      zkSync['lusd'],
      zkSync['cebusd'],
    ],
  },
};

export { basic, networks };
