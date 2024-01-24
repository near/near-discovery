import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'Merchant Moe',
  logo: '/images/apps/merchant-moe.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.MerchantMoeAmountOut',
};
const networks = {
  5000: {
    factoryAddress: '0x5bef015ca9424a7c07b68490616a4c1f094bedec',
    routerAddress: '0xeaEE7EE68874218c3558b40063c42B82D3E7232a',
    defaultCurrencies: {
      input: mantle['weth'],
      output: mantle['usdc'],
    },
    tokens: [
      mantle['usdt'],
      mantle['mnt'],
      mantle['wmnt'],
      mantle['weth'],
      mantle['wbtc'],
      mantle['usdc'],
      mantle['lend'],
      mantle['moe'],
    ],
  },
};

export { basic, networks };
