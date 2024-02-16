import { arbitrum } from '@/config/tokens/arbitrum';
import { bsc } from '@/config/tokens/bsc';
import { polygon } from '@/config/tokens/polygon';

const basic = {
  name: 'C.R.E.A.M.',
  icon: '/images/apps/cream.png',
  data: 'bluebiu.near/widget/Lending.Data.Cream',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
};

const networks = {
  42161: {
    unitrollerAddress: '0xbadaC56c9aca307079e8B8FC699987AAc89813ee',
    oracleAddress: '0xE82225bA6BeD28406912522F01C7102DD9f07e78',
    markets: {
      '0xd5794ea7b269dB3a0CCB396774Cc2D0936FFBD86': {
        decimals: 8,
        symbol: 'crUSDC',
        address: '0xd5794ea7b269dB3a0CCB396774Cc2D0936FFBD86',
        underlyingToken: arbitrum['usdc.e'],
      },
      '0x5eb35dAF9EF97E9e8cc33C486Bad884a62CAe9Ce': {
        decimals: 8,
        symbol: 'crUSDT',
        address: '0x5eb35dAF9EF97E9e8cc33C486Bad884a62CAe9Ce',
        underlyingToken: arbitrum['usdt'],
      },
      '0x5441090C0401EE256b09DEb35679Ad175d1a0c97': {
        decimals: 8,
        symbol: 'crETH',
        address: '0x5441090C0401EE256b09DEb35679Ad175d1a0c97',
        underlyingToken: arbitrum['weth'],
      },
    },
  },
  56: {
    unitrollerAddress: '0x589de0f0ccf905477646599bb3e5c622c84cc0ba',
    oracleAddress: '0x6eeDcf47711373E758A0ab4E467a36Bc2151Cd6A',
    markets: {
      '0x1Ffe17B99b439bE0aFC831239dDECda2A790fF3A': {
        decimals: 8,
        symbol: 'crBNB',
        address: '0x1Ffe17B99b439bE0aFC831239dDECda2A790fF3A',
        underlyingToken: bsc['bnb'],
      },
      '0x2Bc4eb013DDee29D37920938B96d353171289B7C': {
        decimals: 8,
        symbol: 'crBUSD',
        address: '0x2Bc4eb013DDee29D37920938B96d353171289B7C',
        underlyingToken: bsc['busd'],
      },
      '0xd83c88db3a6ca4a32fff1603b0f7ddce01f5f727': {
        decimals: 8,
        symbol: 'crUSDC',
        address: '0xd83c88db3a6ca4a32fff1603b0f7ddce01f5f727',
        underlyingToken: bsc['usdc'],
      },
      '0xb31f5d117541825D6692c10e4357008EDF3E2BCD': {
        decimals: 8,
        symbol: 'crETH',
        address: '0xb31f5d117541825D6692c10e4357008EDF3E2BCD',
        underlyingToken: bsc['eth'],
      },
      '0xEF6d459FE81C3Ed53d292c936b2df5a8084975De': {
        decimals: 8,
        symbol: 'crUSDT',
        address: '0xEF6d459FE81C3Ed53d292c936b2df5a8084975De',
        underlyingToken: bsc['usdt'],
      },
      '0x3942936782d788ce69155F776A51A5F1C9dd9B22': {
        decimals: 8,
        symbol: 'crLINK',
        address: '0x3942936782d788ce69155F776A51A5F1C9dd9B22',
        underlyingToken: bsc['link'],
      },
      '0x81C15D3E956e55e77E1f3F257f0A65Bd2725fC55': {
        decimals: 8,
        symbol: 'crADA',
        address: '0x81C15D3E956e55e77E1f3F257f0A65Bd2725fC55',
        underlyingToken: bsc['ada'],
      },
    },
  },
  137: {
    unitrollerAddress: '0x20CA53E2395FA571798623F1cFBD11Fe2C114c24',
    oracleAddress: '0x812c0b2a2a0a74f6f6ed620fbd2b67fec7db2190',
    markets: {
      '0xf976C9bc0E16B250E0B1523CffAa9E4c07Bc5C8a': {
        decimals: 8,
        symbol: 'crUSDT',
        address: '0xf976C9bc0E16B250E0B1523CffAa9E4c07Bc5C8a',
        underlyingToken: polygon['usdt'],
      },
      '0x3FaE5e5722C51cdb5B0afD8c7082e8a6AF336Ee8': {
        decimals: 8,
        symbol: 'crMATIC',
        address: '0x3FaE5e5722C51cdb5B0afD8c7082e8a6AF336Ee8',
        underlyingToken: polygon['wmatic'],
      },
      '0x73CF8c5D14Aa0EbC89f18272A568319F5BAB6cBD': {
        decimals: 8,
        symbol: 'crUSDC',
        address: '0x73CF8c5D14Aa0EbC89f18272A568319F5BAB6cBD',
        underlyingToken: polygon['usdc'],
      },
      '0x7ef18d0a9C3Fb1A716FF6c3ED0Edf52a2427F716': {
        decimals: 8,
        symbol: 'crWETH',
        address: '0x7ef18d0a9C3Fb1A716FF6c3ED0Edf52a2427F716',
        underlyingToken: polygon['eth'],
      },
      '0x4486835e0C567A320C0636d8F6e6e6679A46a271': {
        decimals: 8,
        symbol: 'crAAVE',
        address: '0x4486835e0C567A320C0636d8F6e6e6679A46a271',
        underlyingToken: polygon['aave'],
      },
      '0x20d5d319C2964ecb52e1B006a4C059b7f6d6ad0a': {
        decimals: 8,
        symbol: 'crLINK',
        address: '0x20d5d319C2964ecb52e1B006a4C059b7f6d6ad0a',
        underlyingToken: polygon['link'],
      },
    },
  },
};

export default { basic, networks };
