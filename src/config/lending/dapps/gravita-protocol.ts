import { arbitrum } from '@/config/tokens/arbitrum';
import { avalanche } from '@/config/tokens/avalanche';
import { base } from '@/config/tokens/base';
import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';
import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'Gravita Protocol',
  // icon: '/images/apps/granary.png',
  data: 'bluebiu.near/widget/Lending.Data.Liquity',
  handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'liquity',
};

const networks = {
  //  arb
  42161: {
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    StabilityPool: '0x0a3137E103a8F268Fa065f6d5922ed6173B7BDFA',
    GRAIAddress: '0x894134a25a5faC1c2C26F1d8fBf05111a3CB9487',
    markets: {
      [arbitrum['reth'].address]: {
        decimals: 18,
        underlyingToken: arbitrum['reth'],
        BorrowerOperations: '0x89F1ecCF2644902344db02788A790551Bb070351',
        BORROW: 'GRAI',
        'MAX-LTV': 85,
        'ONE-TIME-FEE': 2,
        'MIN-DEBT': 200,
        'GRAI-MINTED': 993251,
        'GRAI-TOTAL': 2000000,
      },
      [arbitrum['weth'].address]: {
        decimals: 18,
        underlyingToken: arbitrum['weth'],
        BorrowerOperations: '0x89F1ecCF2644902344db02788A790551Bb070351',
        BORROW: 'GRAI',
        'MAX-LTV': 90,
        'ONE-TIME-FEE': 2,
        'MIN-DEBT': 200,
        'GRAI-MINTED': 327697,
        'GRAI-TOTAL': 500000,
      },
      [arbitrum['wst-eth'].address]: {
        decimals: 18,
        underlyingToken: arbitrum['wst-eth'],
        BorrowerOperations: '0x89F1ecCF2644902344db02788A790551Bb070351',
        BORROW: 'GRAI',
        'MAX-LTV': 85,
        'ONE-TIME-FEE': 2,
        'MIN-DEBT': 200,
        'GRAI-MINTED': 2380000,
        'GRAI-TOTAL': 3000000,
      },
      [arbitrum['sfrxETH'].address]: {
        decimals: 18,
        underlyingToken: arbitrum['sfrxETH'],
        BorrowerOperations: '0x89F1ecCF2644902344db02788A790551Bb070351',
        BORROW: 'GRAI',
        'MAX-LTV': 80,
        'ONE-TIME-FEE': 2,
        'MIN-DEBT': 200,
        'GRAI-MINTED': 184280,
        'GRAI-TOTAL': 500000,
      },
    },
  },
  // zkevm
  1101: {
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    StabilityPool: '0x5Bd5b45f6565762928A79779F6C2DD43c15c92EE',
    GRAIAddress: '0xCA68ad4EE5c96871EC6C6dac2F714a8437A3Fe66',
    markets: {
      [polygonZkevm['reth'].address]: {
        decimals: 18,
        underlyingToken: polygonZkevm['reth'],
        BorrowerOperations: '0xC818f878F27D0273Fb53B71d281C82921F0aF15c',
        BORROW: 'GRAI',
        'MAX-LTV': 85,
        'ONE-TIME-FEE': 2,
        'MIN-DEBT': 200,
        'GRAI-MINTED': 50530,
        'GRAI-TOTAL': 500000,
      },
      [polygonZkevm['weth'].address]: {
        decimals: 18,
        underlyingToken: polygonZkevm['weth'],
        BorrowerOperations: '0xC818f878F27D0273Fb53B71d281C82921F0aF15c',
        BORROW: 'GRAI',
        'MAX-LTV': 90,
        'ONE-TIME-FEE': 2,
        'MIN-DEBT': 200,
        'GRAI-MINTED': 2980,
        'GRAI-TOTAL': 1000000,
      },
    },
  },
  // Linea
  59144: {
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    StabilityPool: '0x42865C7FA0b84cf76C8e8256f3356226EDC3b1be',
    GRAIAddress: '0x894134a25a5faC1c2C26F1d8fBf05111a3CB9487',
    markets: {
      [linea['wsteth'].address]: {
        decimals: 18,
        underlyingToken: linea['wsteth'],
        BorrowerOperations: '0x40E0e274A42D9b1a9D4B64dC6c46D21228d45C20',
        BORROW: 'GRAI',
        'MAX-LTV': 85,
        'ONE-TIME-FEE': 2,
        'MIN-DEBT': 200,
        'GRAI-MINTED': 23822,
        'GRAI-TOTAL': 1000000,
      },
      [linea['weth'].address]: {
        decimals: 18,
        underlyingToken: linea['weth'],
        BorrowerOperations: '0x40E0e274A42D9b1a9D4B64dC6c46D21228d45C20',
        BORROW: 'GRAI',
        'MAX-LTV': 90,
        'ONE-TIME-FEE': 2,
        'MIN-DEBT': 200,
        'GRAI-MINTED': 22897,
        'GRAI-TOTAL': 1000000,
      },
    },
  },
  324: {
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    StabilityPool: '0xDAce04E411D9916169c0401033a7f76994eF5A0f',
    GRAIAddress: '0x5FC44E95eaa48F9eB84Be17bd3aC66B6A82Af709',
    markets: {
      [zkSync['weth'].address]: {
        decimals: 18,
        underlyingToken: zkSync['weth'],
        BorrowerOperations: '0xd085Fd2338Cefb9cBD212F74d479072C1E7A25bf',
        BORROW: 'GRAI',
        'MAX-LTV': 90,
        'ONE-TIME-FEE': 2,
        'MIN-DEBT': 200,
        'GRAI-MINTED': 255355,
        'GRAI-TOTAL': 1000000,
      },
    },
  },
};

export default { basic, networks };
