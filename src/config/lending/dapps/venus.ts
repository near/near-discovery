import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Venus',
  icon: '/images/apps/venus.png',
  data: 'bluebiu.near/widget/Lending.Data.Venus',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Lending.RewardClaim.Venus',
};

const networks = {
  56: {
    unitrollerAddress: '0xfD36E2c2a6789Db23113685031d7F16329158384',
    oracleAddress: '0x6592b5DE802159F3E74B2486b091D11a8256ab8A',
    rewardPrimeAddress: '0xBbCD063efE506c3D42a0Fa2dB5C08430288C71FC',
    rewardAddress: '0xfB0f09dB330dC842a6637BfB959209424BbFE8C7',
    markets: {
      '0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B': {
        decimals: 8,
        symbol: 'vBTC',
        address: '0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B',
        underlyingToken: bsc['btcb'],
      },
      '0xA07c5b74C9B40447a954e1466938b865b6BBea36': {
        decimals: 8,
        symbol: 'vBNB',
        address: '0xA07c5b74C9B40447a954e1466938b865b6BBea36',
        underlyingToken: bsc['bnb'],
      },
      '0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0': {
        decimals: 8,
        symbol: 'vWBETH',
        address: '0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0',
        underlyingToken: bsc['wbeth'],
      },
      '0xfD5840Cd36d94D7229439859C0112a4185BC0255': {
        decimals: 8,
        symbol: 'vUSDT',
        address: '0xfD5840Cd36d94D7229439859C0112a4185BC0255',
        underlyingToken: bsc['usdt'],
      },
      '0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8': {
        decimals: 8,
        symbol: 'vUSDC',
        address: '0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8',
        underlyingToken: bsc['usdc'],
      },
      '0xf508fCD89b8bd15579dc79A6827cB4686A3592c8': {
        decimals: 8,
        symbol: 'vETH',
        address: '0xf508fCD89b8bd15579dc79A6827cB4686A3592c8',
        underlyingToken: bsc['eth'],
      },
      '0xB248a295732e0225acd3337607cc01068e3b9c10': {
        decimals: 8,
        symbol: 'vXRP',
        address: '0xB248a295732e0225acd3337607cc01068e3b9c10',
        underlyingToken: bsc['xrp'],
      },
      '0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B': {
        decimals: 8,
        symbol: 'vLTC',
        address: '0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B',
        underlyingToken: bsc['ltc'],
      },
      '0x650b940a1033B8A1b1873f78730FcFC73ec11f1f': {
        decimals: 8,
        symbol: 'vLINK',
        address: '0x650b940a1033B8A1b1873f78730FcFC73ec11f1f',
        underlyingToken: bsc['link'],
      },
      '0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec': {
        decimals: 8,
        symbol: 'vADA',
        address: '0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec',
        underlyingToken: bsc['ada'],
      },
      '0x86aC3974e2BD0d60825230fa6F355fF11409df5c': {
        decimals: 8,
        symbol: 'vCAKE',
        address: '0x86aC3974e2BD0d60825230fa6F355fF11409df5c',
        underlyingToken: bsc['cake'],
      },
    },
    rewardsPrimeData: {
      '0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8': {
        borrow: '2405.43',
        supply: '13068.75',
        stake: '3265.30',
      },
      '0xfD5840Cd36d94D7229439859C0112a4185BC0255': { borrow: '10009.21', supply: '5003.94', stake: '3731.33' },
      '0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B': { borrow: '0.04', supply: '0.71', stake: '4124.59' },
      '0xf508fCD89b8bd15579dc79A6827cB4686A3592c8': { borrow: '0.49', supply: '9.86', stake: '4788.05' },
    },
    rewardToken: bsc['xvs'],
  },
};

export default { basic, networks };
