import { base } from '@/config/tokens/base';

const basic = {
  name: 'Moonwell',
  icon: '/images/apps/moonwell.png',
  data: 'bluebiu.near/widget/Lending.Data.Moonwell',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Base.Lending.MoonwellHandlerClaim',
};

const networks = {
  8453: {
    unitrollerAddress: '0xfBb21d0380beE3312B33c4353c8936a0F13EF26C',
    oracleAddress: '0xEC942bE8A8114bFD0396A5052c36027f2cA6a9d0',
    rewardDistributorAddress: '0xe9005b078701e2A0948D2EaC43010D35870Ad9d2',
    markets: {
      '0x703843C3379b52F9FF486c9f5892218d2a065cC8': {
        decimals: 8,
        symbol: 'mUSDbC',
        address: '0x703843C3379b52F9FF486c9f5892218d2a065cC8',
        underlyingToken: base['usdbc'],
      },
      '0x628ff693426583D9a7FB391E54366292F509D457': {
        decimals: 8,
        symbol: 'mWETH',
        address: '0x628ff693426583D9a7FB391E54366292F509D457',
        underlyingToken: base['weth'],
      },
    },
  },
};

export default { basic, networks };
