import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'Lendle',
  icon: '/images/apps/lendle.png',
  data: 'bluebiu.near/widget/Lending.Data.Lendle',
  handler: 'bluebiu.near/widget/Lending.Handler.Radiant',
  handlerClaim: 'bluebiu.near/widget/Mantle.Lending.LendleClaimHandler',
  type: 'aave2',
};

const networks = {
  5000: {
    oracleAddress: '0x870c9692Ab04944C86ec6FEeF63F261226506EfC',
    poolAddressProvider: '0xAb94Bedd21ae3411eB2698945dfCab1D5C19C3d4',
    aaveProtocolDataProviderAddress: '0x552b9e4bae485C4B7F540777d7D25614CdB84773',
    lendingPoolAddress: '0xCFa5aE7c2CE8Fadc6426C1ff872cA45378Fb7cF3',
    wethGateway: '0xEc831f8710C6286a91a348928600157f07aC55c2',
    incentiveController: '0x79e2fd1c484EB9EE45001A98Ce31F28918F27C41',
    markets: {
      [mantle['weth'].address]: {
        decimals: 18,
        symbol: 'lvWETH',
        address: '0x787cb0d29194f0faca73884c383cf4d2501bb874',
        underlyingToken: mantle['weth'],
        stableDebtTokenAddress: '0x0ca5e3cd5f3273b066422291edda3768451fbb68',
        variableDebtTokenAddress: '0x5df9a4be4f9d717b2bfece9ec350dcf4cbcb91d8',
      },
      [mantle['wmnt'].address]: {
        decimals: 18,
        symbol: 'lvWMNT',
        address: '0x683696523512636b46a826a7e3d1b0658e8e2e1c',
        underlyingToken: mantle['wmnt'],
        stableDebtTokenAddress: '0xafefc53be7e32c7510f054abb1ec5e44c03fccab',
        variableDebtTokenAddress: '0x18d3e4f9951fedcddd806538857ebed2f5f423b7',
      },
      [mantle['wbtc'].address]: {
        decimals: 8,
        symbol: 'lvWBTC',
        address: '0x44cccbbd7a5a9e2202076ea80c185da0058f1715',
        underlyingToken: mantle['wbtc'],
        stableDebtTokenAddress: '0x1817cde5cd6423c3b87039e1cb000bb2ac4e05c7',
        variableDebtTokenAddress: '0x42f9f9202d5f4412148662cf3bc68d704c8e354f',
      },
      [mantle['usdt'].address]: {
        decimals: 6,
        symbol: 'lvUSDT',
        address: '0xe71cbaaa6b093fce66211e6f218780685077d8b5',
        underlyingToken: mantle['usdt'],
        stableDebtTokenAddress: '0xea8bd20f6c5424ab4acf132c70b6c7355e11f62e',
        variableDebtTokenAddress: '0xac3c14071c80819113df501e1ab767be910d5e5a',
      },
      [mantle['usdc'].address]: {
        decimals: 6,
        symbol: 'lvUSDC',
        address: '0xf36afb467d1f05541d998bbbcd5f7167d67bd8fc',
        underlyingToken: mantle['usdc'],
        stableDebtTokenAddress: '0xee8d412a4ef6613c08889f9cd1fd7d4a065f9a8b',
        variableDebtTokenAddress: '0x334a542b51212b8bcd6f96efd718d55a9b7d1c35',
      },
    },
    rewardToken: mantle['lend'],
  },
};

export default { basic, networks };
