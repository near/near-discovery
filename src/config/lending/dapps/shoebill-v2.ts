import { manta } from '@/config/tokens/manta';

const basic = {
  name: 'Shoebill V2',
  icon: '/images/apps/shoebill-v2.png',
  data: 'bluebiu.near/widget/Lending.Data.ShoeBillV2',
  handler: 'bluebiu.near/widget/Lending.Handler.ShoeBillV2',
};

const networks = {
  169: {
    markets: {
      '0x033F5e084a627cC420980ED9B1476C84A92FC5D4': {
        decimals: 8,
        symbol: 'sbSTONE',
        address: '0x033F5e084a627cC420980ED9B1476C84A92FC5D4',
        underlyingToken: manta['stone'],
      },
      '0xE103F874B2D144C5B327FA3d57069Bb19c0779e2': {
        decimals: 8,
        symbol: 'sbETH',
        address: '0xE103F874B2D144C5B327FA3d57069Bb19c0779e2',
        underlyingToken: manta['eth'],
      },
      '0xc0Ef6DEA74E54689867fDD5F0ab2202F7d8A0D7b': {
        decimals: 8,
        symbol: 'sbwUSDM',
        address: '0xc0Ef6DEA74E54689867fDD5F0ab2202F7d8A0D7b',
        underlyingToken: manta['wusdm'],
      },
      '0xfF2033181Cbf7EE2656d9a527d378930b31C3a42': {
        decimals: 8,
        symbol: 'sbUSDC',
        address: '0xfF2033181Cbf7EE2656d9a527d378930b31C3a42',
        underlyingToken: manta['usdc'],
      },
    },
  },
};

export default { basic, networks };
