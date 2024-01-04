import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'Ammos Finance',
  logo: 'https://ipfs.near.social/ipfs/bafkreicwvufboezdhcjnvmwmy5ctbd7d4zimdivuaawn5g3bs2hxb567ra',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.RamsesV2AmountOut',
};
const networks = {
  5000: {
    factoryAddress: '0x636eA278699A300d3A849aB2cE36c891C4eE3Da0',
    routerAddress: '0xBa68D459210Fc667a97245F71719a479CAFeB571',
    quoterAddress: '0x42cE770b8B765938De04984e006c1B54F1A567f8',
    fees: [100, 500, 3000, 10000],
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc'],
    },
    tokens: [
      mantle['weth'],
      mantle['usdc'],
      mantle['mnt'],
      mantle['usdt'],
      mantle['wbtc'],
      mantle['wmnt'],
      mantle['dai'],
    ],
  },
};

export { basic, networks };
