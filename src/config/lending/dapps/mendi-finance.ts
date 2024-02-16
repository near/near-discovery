import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'mendi finance',
  icon: '/images/apps/mendi.png',
  data: 'bluebiu.near/widget/Lending.Data.MendiFinance',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Linea.Lending.MendiHandlerClaim',
};

const networks = {
  59144: {
    unitrollerAddress: '0x1b4d3b0421dDc1eB216D230Bc01527422Fb93103',
    oracleAddress: '0xe159031D368Bf07F803DA0E96ce747F3B44F1230',
    distributionAddress: '0x3b9B9364Bf69761d308145371c38D9b558013d40',
    lensAddress: '0x52354609AF7A8FdD1fbcF9d4D52D25B26492B69b',
    defaultMarket: '0x333D8b480BDB25eA7Be4Dd87EEB359988CE1b30D',
    markets: {
      '0xAd7f33984bed10518012013D4aB0458D37FEE6F3': {
        decimals: 8,
        symbol: 'meWETH',
        address: '0xAd7f33984bed10518012013D4aB0458D37FEE6F3',
        underlyingToken: linea['weth'],
      },
      '0xf669C3C03D9fdF4339e19214A749E52616300E89': {
        decimals: 8,
        symbol: 'meUSDT',
        address: '0xf669C3C03D9fdF4339e19214A749E52616300E89',
        underlyingToken: linea['usdt'],
      },
      '0x1f27f81C1D13Dd96A3b75d42e3d5d92b709869AA': {
        decimals: 8,
        symbol: 'meDAI',
        address: '0x1f27f81C1D13Dd96A3b75d42e3d5d92b709869AA',
        underlyingToken: linea['dai'],
      },
      '0x333D8b480BDB25eA7Be4Dd87EEB359988CE1b30D': {
        decimals: 8,
        symbol: 'meUSDC',
        address: '0x333D8b480BDB25eA7Be4Dd87EEB359988CE1b30D',
        underlyingToken: linea['usdc'],
      },
    },
    rewardToken: linea['mendi'],
  },
};

export default { basic, networks };
