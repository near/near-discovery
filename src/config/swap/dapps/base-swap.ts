import { base } from '@/config/tokens/base';

const basic = {
  name: 'BaseSwap',
  logo: 'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F1348261154-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F2l8R5PBQEb9j87AEVFTv%252Ficon%252FfO1NO60iKDdgbEaPqmpQ%252FBaseswap_Logo.png%3Falt%3Dmedia%26token%3Dc22d4fa3-7fc5-4927-b4c1-0ccc3f337cdb',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};

const networks = {
  8453: {
    factoryAddress: '0xFDa619b6d20975be80A10332cD39b9a4b0FAa8BB',
    routerAddress: '0x327Df1E6de05895d2ab08513aaDD9313Fe505d86',
    defaultCurrencies: {
      input: base['eth'],
      output: base['axlusdc'],
    },
    tokens: [base['eth'], base['axlusdc'], base['cbeth'], base['weth'], base['bswap'], base['dai'], base['usdbc']],
  },
};

export { basic, networks };
