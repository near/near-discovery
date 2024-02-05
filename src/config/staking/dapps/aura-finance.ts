import { gnosis } from '@/config/tokens/gnosis';

const basic = {
  name: 'Aura Finance',
  // icon: '/images/apps/granary.png',
  // data: 'bluebiu.near/widget/Lending.Data.Liquity',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'staking',
};
const POOL_TYPES = {
  WeightedPool: 'WeightedPool',
  ComposableStablePool: 'ComposableStablePool',
  StablePool: 'StablePool',
};
const tokenArray = Object.values(gnosis);
const tokenMapping = tokenArray.reduce((prev, cur) => {
  (prev as any)[cur.address] = cur;
  return prev;
}, {});

const networks = {
  // gnosis
  100: {
    RewardPoolDepositWrapper: '0x0Fec3d212BcC29eF3E505B555D7a7343DF0B7F76',
    PoolContractWrapper: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    POOLS: [
      {
        poolName: 'WETH-wstETH',
        Rewards_contract_address: '0x026d163C28cC7dbf57d6ED57f14208Ee412CA526',
        Rewards_depositor_contract_address: '0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76',
        LP_token_address: '0xbad20c15a773bf03ab973302f61fabcea5101f0a',
        Balancer_Gauge: '0x27519F69b2Ac912aeb6fE066180FB25a17c71755',
        Aura_Stash: '0xe2F2499474B4Bef0a7320c1D2b0FEfFD5430Acf8',
        Balancer_Pool_ID: '0xbad20c15a773bf03ab973302f61fabcea5101f0a000000000000000000000034',
        Aura_Pool_ID: 0,
        poolType: POOL_TYPES.WeightedPool,
        APR: 0.0538,
        pjAPR: 0.0605,
      },
      {
        poolName: 'staBAL3-EURe',
        Rewards_contract_address: '0xf4116f1be90057e6f85b0dcc14c47c84cc4575da',
        Rewards_depositor_contract_address: '0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76',
        LP_token_address: '0x0c1b9ce6bf6c01f587c2ee98b0ef4b20c6648753',
        Balancer_Gauge: '0x492cd2290e5b971eab622d6325cef6a329cf8a58',
        Aura_Stash: '0x727d3d124bc9880d06aa7508c78c2c1f4e7369b2',
        Balancer_Pool_ID: '0x0c1b9ce6bf6c01f587c2ee98b0ef4b20c6648753000000000000000000000050',
        Aura_Pool_ID: 14,
        poolType: POOL_TYPES.ComposableStablePool,
        APR: 0.0538,
        pjAPR: 0.0605,
      },
      {
        poolName: 'USDT-sDAI-USDC',
        Rewards_contract_address: '0x7513105d6cf9d18756d95ded81d6d3f68db4b8da',
        Rewards_depositor_contract_address: '0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76',
        LP_token_address: '0x7644fa5d0ea14fcf3e813fdf93ca9544f8567655',
        Balancer_Gauge: '0xdec0362b3229690fbe4f88c57472610588bb9a2e',
        Aura_Stash: '0xffd046ed3635697c98c5ee1ac92f6c7ed1c9da54',
        Balancer_Pool_ID: '0x7644fa5d0ea14fcf3e813fdf93ca9544f8567655000000000000000000000066',
        Aura_Pool_ID: 21,
        poolType: POOL_TYPES.ComposableStablePool,
        APR: 0.0814,
        pjAPR: 0.0784,
      },
      {
        poolName: 'stEUR-EURe',
        Rewards_contract_address: '0x408883e983695dec78cf66480e6efef907a73c21',
        Rewards_depositor_contract_address: '0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76',
        LP_token_address: '0x06135a9ae830476d3a941bae9010b63732a055f4',
        Balancer_Gauge: '0x49b7c059bf0a71583918928d33c84dcb2aa001f8',
        Aura_Stash: '0xf2a9d8ea9bebf593977e98da1e642403c8834e06',
        Balancer_Pool_ID: '0x06135a9ae830476d3a941bae9010b63732a055f4000000000000000000000065',
        Aura_Pool_ID: 22,
        poolType: POOL_TYPES.ComposableStablePool,
        APR: 0.1426,
        pjAPR: 0.1431,
      },
      {
        poolName: 'wstETH-GNO',
        Rewards_contract_address: '0x14a81c9283cc16897daa3f466847baa260b770eb',
        Rewards_depositor_contract_address: '0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76',
        LP_token_address: '0x4683e340a8049261057d5ab1b29c8d840e75695e',
        Balancer_Gauge: '0xb812249d60b80c7cbc9398e382ed6dfdf82e23d2',
        Aura_Stash: '0x95d41829eb179d549ede8e6db31c10818c7a4e0f',
        Balancer_Pool_ID: '0x4683e340a8049261057d5ab1b29c8d840e75695e00020000000000000000005a',
        Aura_Pool_ID: 15,
        poolType: POOL_TYPES.WeightedPool,
        APR: 0.0426,
        pjAPR: 0.0442,
      },
      {
        poolName: 'staBAL3-GNO',
        Rewards_contract_address: '0x7e6ccd111b56dd650af9d598e23f0cb0da7e59e7',
        Rewards_depositor_contract_address: '0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76',
        LP_token_address: '0x274dedb9356c3e1e24bfe2bf3d4349fbdbfa0d14',
        Balancer_Gauge: '0x4489dc0ff2a43023f2a85efdc4614d250612dd0d',
        Aura_Stash: '0x429dc5616f9c78131a4bb592b1a0eb6f5e996c0e',
        Balancer_Pool_ID: '0x274dedb9356c3e1e24bfe2bf3d4349fbdbfa0d14000200000000000000000054',
        Aura_Pool_ID: 12,
        poolType: POOL_TYPES.WeightedPool,
        APR: 0.0538,
        pjAPR: 0.0605,
      },
      {
        poolName: 'staBAL3-WETH-WBTC',
        Rewards_contract_address: '0x112EA63D3A70bB7926F95DA81EaDF71Aba0f0955',
        Rewards_depositor_contract_address: '0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76',
        LP_token_address: '0x66888e4f35063ad8bb11506a6fde5024fb4f1db0',
        Balancer_Gauge: '0x9fF4e3925B88B6885083A88c2283a21CD504D3d4',
        Aura_Stash: '0x353a64558c8670974216BDa16c3d420FADE65293',
        Balancer_Pool_ID: '0x66888e4f35063ad8bb11506a6fde5024fb4f1db0000100000000000000000053',
        Aura_Pool_ID: 13,
        poolType: POOL_TYPES.WeightedPool,
        APR: 0.2384,
        pjAPR: 0.242,
      },
      {
        poolName: 'wstETH-COW',
        Rewards_contract_address: '0x85298595d4f6f8fa91f8658ba9c10f9a85b17f62',
        Rewards_depositor_contract_address: '0x0fec3d212bcc29ef3e505b555d7a7343df0b7f76',
        LP_token_address: '0x4cdabe9e07ca393943acfb9286bbbd0d0a310ff6',
        Balancer_Gauge: '0xce18a3d0d928ab8883f355b5009d2de07d5c1d83',
        Aura_Stash: '0x918a3d87ddb20f225647e1560f4f66f8e0590311',
        Balancer_Pool_ID: '0x4cdabe9e07ca393943acfb9286bbbd0d0a310ff600020000000000000000005c',
        Aura_Pool_ID: 20,
        poolType: POOL_TYPES.WeightedPool,
        APR: 0.1648,
        pjAPR: 0.1676,
      },
    ],
    TOKENS: tokenMapping,
    markets: {
      // [gnosis['wmatic'].address]: {
      //   decimals: 18,
      //   underlyingToken: gnosis['wmatic'],
      // },
    },
  },
};

export default { basic, networks };
