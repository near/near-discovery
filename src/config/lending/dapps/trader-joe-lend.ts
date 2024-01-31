import { avalanche } from '@/config/tokens/avalanche';

const basic = {
  name: 'Trader Joe',
  icon: '/images/apps/trader-joe.png',
  data: 'bluebiu.near/widget/Lending.Data.TraderJoe',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Avalanche.Lending.BenqiClaimHandler',
};

const networks = {
  43114: {
    unitrollerAddress: '0xdc13687554205E5b89Ac783db14bb5bba4A1eDaC',
    oracleAddress: '0xd7Ae651985a871C1BC254748c40Ecc733110BC2E',
    lensAddress: '',
    markets: {
      '0x929f5caB61DFEc79a5431a7734a68D714C4633fa': {
        decimals: 8,
        symbol: 'jWETH',
        address: '0x929f5caB61DFEc79a5431a7734a68D714C4633fa',
        underlyingToken: avalanche['eth'],
      },
      '0x29472D511808Ce925F501D25F9Ee9efFd2328db2': {
        decimals: 8,
        symbol: 'jUSDC',
        address: '0x29472D511808Ce925F501D25F9Ee9efFd2328db2',
        underlyingToken: avalanche['usdc'],
      },
      '0x3fE38b7b610C0ACD10296fEf69d9b18eB7a9eB1F': {
        decimals: 8,
        symbol: 'jWBTC',
        address: '0x3fE38b7b610C0ACD10296fEf69d9b18eB7a9eB1F',
        underlyingToken: avalanche['wbtc.e'],
      },
      '0xEd6AaF91a2B084bd594DBd1245be3691F9f637aC': {
        decimals: 8,
        symbol: 'jUSDC',
        address: '0xEd6AaF91a2B084bd594DBd1245be3691F9f637aC',
        underlyingToken: avalanche['usdc.e'],
      },
      '0x8b650e26404AC6837539ca96812f0123601E4448': {
        decimals: 8,
        symbol: 'jUSDT',
        address: '0x8b650e26404AC6837539ca96812f0123601E4448',
        underlyingToken: avalanche['usdt.e'],
      },
      '0xc988c170d0E38197DC634A45bF00169C7Aa7CA19': {
        decimals: 8,
        symbol: 'jDAI',
        address: '0xc988c170d0E38197DC634A45bF00169C7Aa7CA19',
        underlyingToken: avalanche['dai.e'],
      },
      '0x585E7bC75089eD111b656faA7aeb1104F5b96c15': {
        decimals: 8,
        symbol: 'jLINK',
        address: '0x585E7bC75089eD111b656faA7aeb1104F5b96c15',
        underlyingToken: avalanche['link.e'],
      },
      '0xcE095A9657A02025081E0607c8D8b081c76A75ea': {
        decimals: 8,
        symbol: 'jMIM',
        address: '0xcE095A9657A02025081E0607c8D8b081c76A75ea',
        underlyingToken: avalanche['mim'],
      },
      '0x13A7a6C167d75baDd316DDeef6C526c8463A090F': {
        decimals: 8,
        symbol: 'jBTC.b',
        address: '0x13A7a6C167d75baDd316DDeef6C526c8463A090F',
        underlyingToken: avalanche['btc.b'],
      },
      '0x50ac14A3Ee0a4cb6Ef829F7ad65B2dA5493e99d2': {
        decimals: 8,
        symbol: 'jUSDT',
        address: '0x50ac14A3Ee0a4cb6Ef829F7ad65B2dA5493e99d2',
        underlyingToken: avalanche['usdt'],
      },
    },
  },
};

export default { basic, networks };
