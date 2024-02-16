import { arbitrum } from '@/config/tokens/arbitrum';
import { polygon } from '@/config/tokens/polygon';
import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'FilDA',
  icon: '/images/apps/filda.png',
  data: 'bluebiu.near/widget/Lending.Data.Filda',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
};

const networks = {
  42161: {
    unitrollerAddress: '0xF67EF5E77B350A81DcbA5430Bc8bE876eDa8D591',
    oracleAddress: '0x34dcfA32dF1332aCB9c2f677F366e73CEF6F1C9B',
    markets: {
      '0x55E5F6E48FD4715e1c05b9dAfa5CfD0B387425Ee': {
        decimals: 18,
        symbol: 'fETH',
        address: '0x55E5F6E48FD4715e1c05b9dAfa5CfD0B387425Ee',
        underlyingToken: arbitrum['eth'],
      },
      '0x5CaB5eA2E616D9D8ed89b3420540f21Cc5ac7698': {
        decimals: 18,
        symbol: 'fUSDT',
        address: '0x5CaB5eA2E616D9D8ed89b3420540f21Cc5ac7698',
        underlyingToken: arbitrum['usdt'],
      },
      '0x541a9133c24bFAb3BD55742b1F16B507b1FBBf44': {
        decimals: 18,
        symbol: 'fUSDC',
        address: '0x541a9133c24bFAb3BD55742b1F16B507b1FBBf44',
        underlyingToken: arbitrum['usdc.e'],
      },
      '0x7cfB238C628f321bA905D1beEc2bfB18AE56Fcdb': {
        decimals: 18,
        symbol: 'fWBTC',
        address: '0x7cfB238C628f321bA905D1beEc2bfB18AE56Fcdb',
        underlyingToken: arbitrum['wbtc'],
      },
      '0x56c0fA757820C2d9Df35CF2874F3268FE717e92f': {
        decimals: 18,
        symbol: 'fDAI',
        address: '0x56c0fA757820C2d9Df35CF2874F3268FE717e92f',
        underlyingToken: arbitrum['dai'],
      },
      '0xDC17Ee4Ef70317433d8083dA696E63b46721b6B9': {
        decimals: 18,
        symbol: 'fSUSHI',
        address: '0xDC17Ee4Ef70317433d8083dA696E63b46721b6B9',
        underlyingToken: arbitrum['sushi'],
      },
      '0xcA7D7F202894e851e495beBCD2A62E0898dD1814': {
        decimals: 18,
        symbol: 'fUNI',
        address: '0xcA7D7F202894e851e495beBCD2A62E0898dD1814',
        underlyingToken: arbitrum['uni'],
      },
      '0xeA1Ca194fF0d211F86fB8E9D8BE985e35Cd16968': {
        decimals: 18,
        symbol: 'fLINK',
        address: '0xeA1Ca194fF0d211F86fB8E9D8BE985e35Cd16968',
        underlyingToken: arbitrum['link'],
      },
    },
  },
  137: {
    unitrollerAddress: '0xfBE0f3A3d1405257Bd69691406Eafa73f5095723',
    oracleAddress: '0x879a05fb8A0545f0Fbd382Cb33fCb63bb71fc082 ',
    markets: {
      '0x154250560242c4f2947Cf2EA6c8e92e0cE714d4E': {
        decimals: 18,
        symbol: 'fMatic',
        address: '0x154250560242c4f2947Cf2EA6c8e92e0cE714d4E',
        underlyingToken: { ...polygon['matic'], address: polygon['wmatic'].address },
      },
      '0x7280faEc8C4a6ABbb3414e31015AC108113363A4': {
        decimals: 18,
        symbol: 'fUSDT',
        address: '0x7280faEc8C4a6ABbb3414e31015AC108113363A4',
        underlyingToken: polygon['usdt'],
      },
      '0x0Ab290A1EBF33F21d7c5d0F9B4CEE940921FDfC0': {
        decimals: 18,
        symbol: 'fDAI',
        address: '0x0Ab290A1EBF33F21d7c5d0F9B4CEE940921FDfC0',
        underlyingToken: polygon['dai'],
      },
      '0xA200126e00A53a4a05533fF0Cfb16b3788524A3e': {
        decimals: 18,
        symbol: 'fWBTC',
        address: '0xA200126e00A53a4a05533fF0Cfb16b3788524A3e',
        underlyingToken: polygon['wbtc'],
      },
      '0xb9542aDd6d6049Ae59Ce39e45Fb2EC88797931E7': {
        decimals: 18,
        symbol: 'fAAVE',
        address: '0xb9542aDd6d6049Ae59Ce39e45Fb2EC88797931E7',
        underlyingToken: polygon['aave'],
      },
      '0x3DbFAE35cd0E5bF812e715a863F2CDc2D2546119': {
        decimals: 18,
        symbol: 'fWETH',
        address: '0x3DbFAE35cd0E5bF812e715a863F2CDc2D2546119',
        underlyingToken: polygon['eth'],
      },
      '0x6C524c36D5dc475A2bb4658c6Ea09b2DbCBefB50': {
        decimals: 18,
        symbol: 'fUSDC',
        address: '0x6C524c36D5dc475A2bb4658c6Ea09b2DbCBefB50',
        underlyingToken: polygon['usdc'],
      },
    },
  },
  56: {
    unitrollerAddress: '0xF0700A310Cb14615a67EEc1A8dAd5791859f65f1',
    oracleAddress: '0x789d92E7D549214a3ECDcfEABAE750f3b44F1adD',
    markets: {
      '0xab9cd8AC3D8a54d7fAee07b4aA4914A57f4Db578': {
        decimals: 18,
        symbol: 'fBNB',
        address: '0xab9cd8AC3D8a54d7fAee07b4aA4914A57f4Db578',
        underlyingToken: { ...bsc['bnb'], address: bsc['wbnb'].address },
      },
      '0x5480c79F4a02657E33586751A66c331F0230bB2D': {
        decimals: 18,
        symbol: 'fUSDT',
        address: '0x5480c79F4a02657E33586751A66c331F0230bB2D',
        underlyingToken: bsc['usdt'],
      },
      '0x8aee1d27D906895cc771380ba5a49bbD421DD5a0': {
        decimals: 18,
        symbol: 'fBUSD',
        address: '0x8aee1d27D906895cc771380ba5a49bbD421DD5a0',
        underlyingToken: bsc['busd'],
      },
      '0x5B07F2582d0Cc26E400D56266aeBB201c93560eD': {
        decimals: 18,
        symbol: 'fUSDC',
        address: '0x5B07F2582d0Cc26E400D56266aeBB201c93560eD',
        underlyingToken: bsc['usdc'],
      },
      '0x891672f0b855B55b20ea3732c1FBDf389E712829': {
        decimals: 18,
        symbol: 'fETH',
        address: '0x891672f0b855B55b20ea3732c1FBDf389E712829',
        underlyingToken: bsc['eth'],
      },
    },
  },
};

export default { basic, networks };
