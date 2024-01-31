import { arbitrum } from '@/config/tokens/arbitrum';
import { avalanche } from '@/config/tokens/avalanche';
import { base } from '@/config/tokens/base';
import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { polygon } from '@/config/tokens/polygon';
import { zkSync } from '@/config/tokens/zkSync';

const BORROW_TOKEN = 'STAR';
const BORROW_URL = 'https://ipfs.near.social/ipfs/bafkreifn26whjukvke3m35hwcl74up7kckzvahrzib4ab3arq3qyfnelfy';

const basic = {
  name: 'Gravita Protocol',
  // icon: '/images/apps/granary.png',
  // data: 'bluebiu.near/widget/Lending.Data.Liquity',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'liquity',
  BORROW_TOKEN,
  BORROW_URL,
};

const networks = {
  //  arb
  42161: {
    StabilityPool: '0x6afA834Bf44fF8aB7eF89Fd417853e9B13FBfB52',
    borrowTokenAddress: '0xC19669A405067927865B40Ea045a2baabbbe57f5',
    VesselManagerOperations: '0x7A004E02177DA08dF4e4eEC15a0F75Fb5DE6Af04',
    BorrowerOperations: '0xbffC680a9aA46b8B19228497E77888dA6B944B2D',
    markets: {
      [arbitrum['wst-eth'].address]: {
        decimals: 18,
        underlyingToken: arbitrum['wst-eth'],
        // BorrowerOperations: '0xbffC680a9aA46b8B19228497E77888dA6B944B2D',
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 88.9,
        ONE_TIME_FEE: 0.5,
        MIN_DEBT: 180,
        MINTED: 45000,
        MINTED_CAP: 500000,
      },
      [arbitrum['weth'].address]: {
        decimals: 18,
        underlyingToken: arbitrum['weth'],
        // BorrowerOperations: '0xbffC680a9aA46b8B19228497E77888dA6B944B2D',
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 88.9,
        ONE_TIME_FEE: 0.5,
        MIN_DEBT: 180,
        MINTED: 11000,
        MINTED_CAP: 500000,
      },
    },
  },
  // polygon
  137: {
    StabilityPool: '0x6afA834Bf44fF8aB7eF89Fd417853e9B13FBfB52',
    borrowTokenAddress: '0xC19669A405067927865B40Ea045a2baabbbe57f5',
    VesselManagerOperations: '0x7A004E02177DA08dF4e4eEC15a0F75Fb5DE6Af04',
    BorrowerOperations: '0xbffC680a9aA46b8B19228497E77888dA6B944B2D',
    markets: {
      [polygon['wmatic'].address]: {
        decimals: 18,
        underlyingToken: polygon['wmatic'],
        // BorrowerOperations: '0xbffC680a9aA46b8B19228497E77888dA6B944B2D',
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 88.9,
        ONE_TIME_FEE: 0.5,
        MIN_DEBT: 180,
        MINTED: 341000,
        MINTED_CAP: 500000,
      },
      [polygon['stmatic'].address]: {
        decimals: 18,
        underlyingToken: polygon['stmatic'],
        // BorrowerOperations: '0xbffC680a9aA46b8B19228497E77888dA6B944B2D',
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 88.9,
        ONE_TIME_FEE: 0.5,
        MIN_DEBT: 180,
        MINTED: 118000,
        MINTED_CAP: 500000,
      },
    },
  },
};

export default { basic, networks };
