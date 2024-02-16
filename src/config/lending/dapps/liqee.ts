import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Liqee',
  icon: '/images/apps/liqee.png',
  data: 'bluebiu.near/widget/Lending.Data.Liqee',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
};

const networks = {
  56: {
    unitrollerAddress: '0x6d290f45A280A688Ff58d095de480364069af110',
    oracleAddress: '0x7DC17576200590C4d0D8d46843c41f324da2046C',
    markets: {
      '0x88131dd9f6A78d3d23aBcF4960D91913d2dC2307': {
        decimals: 18,
        symbol: 'qETH',
        address: '0x88131dd9f6A78d3d23aBcF4960D91913d2dC2307',
        underlyingToken: bsc['eth'],
      },
      '0xAdCF9619C404de591766B33e696c737ebe341A87': {
        decimals: 18,
        symbol: 'qATOM',
        address: '0xAdCF9619C404de591766B33e696c737ebe341A87',
        underlyingToken: bsc['atom'],
      },
      '0xF51422c47c6C3e40CFCA4a7b04232aeDb7f49948': {
        decimals: 18,
        symbol: 'qDOT',
        address: '0xF51422c47c6C3e40CFCA4a7b04232aeDb7f49948',
        underlyingToken: bsc['dot'],
      },
      '0x450E09a303AA4bcc518b5F74Dd00433bd9555A77': {
        decimals: 18,
        symbol: 'qUSX',
        address: '0x450E09a303AA4bcc518b5F74Dd00433bd9555A77',
        underlyingToken: bsc['usx'],
      },
      '0x5aF1b6cA84693Cc8E733C8273Ba260095B3D05CA': {
        decimals: 18,
        symbol: 'qBNB',
        address: '0x5aF1b6cA84693Cc8E733C8273Ba260095B3D05CA',
        underlyingToken: { ...bsc['bnb'], address: bsc['wbnb'].address },
      },
      '0x5895C6cfa9134AD6B1CBEF041B874F27342e72Af': {
        decimals: 18,
        symbol: 'qtATOM',
        address: '0x5895C6cfa9134AD6B1CBEF041B874F27342e72Af',
        underlyingToken: bsc['tatom'],
      },
      '0xD95e75Bf11FF705ebD0bBc088892483015bB40fb': {
        decimals: 18,
        symbol: 'qXTZ',
        address: '0xD95e75Bf11FF705ebD0bBc088892483015bB40fb',
        underlyingToken: bsc['xtz'],
      },
      '0x9A05Eed908D0C4c2A6bd860027C2a4BbB1deeBd8': {
        decimals: 18,
        symbol: 'qrBNB',
        address: '0x9A05Eed908D0C4c2A6bd860027C2a4BbB1deeBd8',
        underlyingToken: bsc['rbnb'],
      },
      '0x4E673bed356912077c718CBAB286BC135fAA5FB6': {
        decimals: 18,
        symbol: 'qrATOM',
        address: '0x4E673bed356912077c718CBAB286BC135fAA5FB6',
        underlyingToken: bsc['ratom'],
      },
    },
  },
};

export default { basic, networks };
