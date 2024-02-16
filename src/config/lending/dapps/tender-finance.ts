import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Tender Finance',
  icon: '/images/apps/tender.png',
  data: 'bluebiu.near/widget/Lending.Data.TenderFinance',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
};

const networks = {
  42161: {
    unitrollerAddress: '0xeed247Ba513A8D6f78BE9318399f5eD1a4808F8e',
    oracleAddress: '0x0c261270eD2E036c9525243E5Dd0e95f824D77d2',
    markets: {
      '0x242f91207184FCc220beA3c9E5f22b6d80F3faC5': {
        decimals: 8,
        symbol: 'tWETH',
        address: '0x242f91207184FCc220beA3c9E5f22b6d80F3faC5',
        underlyingToken: arbitrum['weth'],
      },
      '0x0706905b2b21574DEFcF00B5fc48068995FCdCdf': {
        decimals: 8,
        symbol: 'tETH',
        address: '0x0706905b2b21574DEFcF00B5fc48068995FCdCdf',
        underlyingToken: arbitrum['eth'],
      },
      '0x0A2f8B6223EB7DE26c810932CCA488A4936cF391': {
        decimals: 8,
        symbol: 'tWBTC',
        address: '0x0A2f8B6223EB7DE26c810932CCA488A4936cF391',
        underlyingToken: arbitrum['wbtc'],
      },
      '0x068485a0f964B4c3D395059a19A05a8741c48B4E': {
        decimals: 8,
        symbol: 'tUSDC',
        address: '0x068485a0f964B4c3D395059a19A05a8741c48B4E',
        underlyingToken: arbitrum['usdc.e'],
      },
      '0xC6121d58E01B3F5C88EB8a661770DB0046523539': {
        decimals: 8,
        symbol: 'tARB',
        address: '0xC6121d58E01B3F5C88EB8a661770DB0046523539',
        underlyingToken: arbitrum['arb'],
      },
      '0x20a6768F6AABF66B787985EC6CE0EBEa6D7Ad497': {
        decimals: 8,
        symbol: 'tGMX',
        address: '0x20a6768F6AABF66B787985EC6CE0EBEa6D7Ad497',
        underlyingToken: arbitrum['gmx'],
      },
      '0x4A5806A3c4fBB32F027240F80B18b26E40BF7E31': {
        decimals: 8,
        symbol: 'tUSDT',
        address: '0x4A5806A3c4fBB32F027240F80B18b26E40BF7E31',
        underlyingToken: arbitrum['usdt'],
      },
      '0xB287180147EF1A97cbfb07e2F1788B75df2f6299': {
        decimals: 8,
        symbol: 'tDAI',
        address: '0xB287180147EF1A97cbfb07e2F1788B75df2f6299',
        underlyingToken: arbitrum['dai'],
      },
      '0x87D06b55e122a0d0217d9a4f85E983AC3d7a1C35': {
        decimals: 8,
        symbol: 'tLINK',
        address: '0x87D06b55e122a0d0217d9a4f85E983AC3d7a1C35',
        underlyingToken: arbitrum['link'],
      },
      '0x27846A0f11EDC3D59EA227bAeBdFa1330a69B9ab': {
        decimals: 8,
        symbol: 'tFRAX',
        address: '0x27846A0f11EDC3D59EA227bAeBdFa1330a69B9ab',
        underlyingToken: arbitrum['frax'],
      },
      '0x8b44D3D286C64C8aAA5d445cFAbF7a6F4e2B3A71': {
        decimals: 8,
        symbol: 'tUNI',
        address: '0x8b44D3D286C64C8aAA5d445cFAbF7a6F4e2B3A71',
        underlyingToken: arbitrum['uni'],
      },
    },
  },
};

export default { basic, networks };
