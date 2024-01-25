import { linea } from '@/config/tokens/linea';
import { zkSync } from '@/config/tokens/zkSync';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Syncswap',
  logo: '/images/apps/sync-swap.png',
  amountOutFn: 'bluebiu.near/widget/Linea.Swap.SyncSwapAmountOut',
};
const networks = {
  59144: {
    factoryAddress: '0x608Cb7C3168427091F5994A45Baf12083964B4A3',
    classicPoolAddres: '0x37BAc764494c8db4e54BDE72f6965beA9fa0AC2d',
    stablePoolAddress: '0xE4CF807E351b56720B17A59094179e7Ed9dD3727',
    routerAddress: '0x80e38291e06339d10AAB483C65695D004dBD5C69',
    defaultCurrencies: {
      input: linea['eth'],
      output: linea['usdc'],
    },
    tokens: [
      linea['eth'],
      linea['usdc'],
      linea['usdt'],
      linea['wbtc'],
      linea['busd'],
      linea['matic'],
      linea['dai'],
      linea['bnb'],
    ],
  },
  324: {
    factoryAddress: '0xbB05918E9B4bA9Fe2c8384d223f0844867909Ffb',
    classicPoolAddres: '0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb',
    stablePoolAddress: '0x5b9f21d407F35b10CbfDDca17D5D84b129356ea3',
    routerAddress: '0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295',
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdc'],
    },
    tokens: [
      zkSync['eth'],
      zkSync['usdc'],
      zkSync['usdt'],
      zkSync['wbtc'],
      zkSync['cebusd'],
      zkSync['zkusd'],
      zkSync['dvf'],
      zkSync['lusd'],
      zkSync['reth'],
    ],
  },
  534352: {
    classicPoolAddres: '0x37BAc764494c8db4e54BDE72f6965beA9fa0AC2d',
    stablePoolAddress: '0xE4CF807E351b56720B17A59094179e7Ed9dD3727',
    routerAddress: '0x80e38291e06339d10AAB483C65695D004dBD5C69',
    defaultCurrencies: {
      input: scroll['weth'],
      output: scroll['usdc'],
    },
    tokens: [
      scroll['weth'],
      scroll['usdc'],
      scroll['usdt'],
      scroll['lusd'],
      scroll['reth'],
      scroll['aave'],
      scroll['crv'],
      scroll['wbtc'],
    ],
  },
};

export { basic, networks };
