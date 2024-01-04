import { arbitrum } from '@/config/tokens/arbitrum';
const basic = {
  name: 'Spartadex',
  logo: 'https://www.gitbook.com/cdn-cgi/image/width=36,dpr=2,height=36,fit=contain,format=auto/https%3A%2F%2F2539732718-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F867aBj8rMNU1rPS95UuB%252Ficon%252F0IOx0Smvya6zU4NhvKKF%252FSPARTICON2.png%3Falt%3Dmedia%26token%3D9161d377-f0c8-4075-aa28-112171510dab',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  42161: {
    factoryAddress: '0xFe8EC10Fe07A6a6f4A2584f8cD9FE232930eAF55',
    routerAddress: '0x89AE36E3B567b914a5E97E6488C6EB5b9C5d0231',
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdc.e'],
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['weth'],
      arbitrum['usdc.e'],
      arbitrum['sparta'],
      arbitrum['arb'],
      arbitrum['wbtc'],
      arbitrum['usdt'],
      arbitrum['gswift'],
    ],
  },
};

export { basic, networks };
