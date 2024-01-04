import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'Agni Finance',
  logo: 'https://ipfs.near.social/ipfs/bafkreihkerekcdjd3cgxzklknlx6ai7zxil24sdcji6fahtlpueqsids6u',
  amountOutFn: 'bluebiu.near/widget/Mantle.Swap.AgniFinanceAmountOut',
};
const networks = {
  5000: {
    factoryAddress: '0x25780dc8Fc3cfBD75F33bFDAB65e969b603b2035',
    routerAddress: '0x319B69888b0d11cEC22caA5034e25FfFBDc88421',
    quoterAddress: '0x9488C05a7b75a6FefdcAE4f11a33467bcBA60177',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc'],
    },
    tokens: [mantle['weth'], mantle['usdc'], mantle['mnt'], mantle['usdt']],
  },
};

export { basic, networks };
