import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Biswap',
  logo: 'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F3913055502-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MYxuX082CiatAs0SbU8%252Favatar-1619452090567.png%3Fgeneration%3D1619452091011230%26alt%3Dmedia',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  56: {
    factoryAddress: '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
    routerAddress: '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8',
    defaultCurrencies: {
      input: bsc['eth'],
      output: bsc['usdc'],
    },
    tokens: [bsc['eth'], bsc['bnb'], bsc['wbnb'], bsc['btcb'], bsc['bscusd'], bsc['busd'], bsc['usdc'], bsc['bsw']],
  },
};

export { basic, networks };
