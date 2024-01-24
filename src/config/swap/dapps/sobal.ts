import { base } from '@/config/tokens/base';

const basic = {
  name: 'Sobal',
  logo: '/images/apps/sobal.png',
  amountOutFn: 'bluebiu.near/widget/Metis.Swap.HummusExchangeAmountOut',
};
const networks = {
  8453: {
    routerAddress: '0x7122e35ceC2eED4A989D9b0A71998534A203972C',
    defaultCurrencies: {
      input: base['eth'],
      output: base['axlusdc'],
    },
    tokens: [
      base['weth'],
      base['eth'],
      base['usdc'],
      base['axlusdc'],
      base['usdbc'],
      base['dai'],
      base['cbeth'],
      base['bald'],
    ],
    pools: [
      [
        [base['dai'].address, '0x6372ec09dbf0c2907bb7b1529a1fc6359310f1bd', base['usdbc'].address],
        '0x6372ec09dbf0c2907bb7b1529a1fc6359310f1bd000000000000000000000009',
      ],
      [
        [base['weth'].address, base['axlusdc'].address],
        '0xafb45a2c365749ddc9166e6ddf845af2e9217345000200000000000000000003',
      ],
      [
        [base['bald'].address, base['weth'].address],
        '0x074094aac7a5e2fe9e16b5d0be9ed288c5ea6c8e000200000000000000000004',
      ],
      [
        [base['weth'].address, base['usdbc'].address],
        '0x2c8cdb099e751470068e29b16604e73ee7755e0600020000000000000000000b',
      ],
      [
        [base['usdbc'].address, base['axlusdc'].address],
        '0x847c82f5be6a0697d70b0b4d179f3d0c3f25f20000020000000000000000000c',
      ],
      [
        [base['bald'].address, base['axlusdc'].address],
        '0x6e6ba6490fa58e8b8c4a45c6d02220f48ace8732000200000000000000000005',
      ],
      [
        [base['usdc'].address, base['axlusdc'].address],
        '0x11ccbe15767ab24faa22a1ccd2f275ec6e0ec13c00020000000000000000000d',
      ],
    ],
  },
};

export { basic, networks };
