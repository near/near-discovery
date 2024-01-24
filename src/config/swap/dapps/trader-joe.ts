import { avalanche } from '@/config/tokens/avalanche';
import { bsc } from '@/config/tokens/bsc';
const basic = {
  name: 'Trader Joe',
  logo: '/images/apps/trader-joe.png',
  amountOutFn: 'bluebiu.near/widget/Avalanche.Swap.JoeTraderAmountOut',
};
const networks = {
  43114: {
    factoryAddress: '0x8e42f2F4101563bF679975178e880FD87d3eFd4e',
    routerAddress: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
    quoterAddress: '0xd76019A16606FDa4651f636D9751f500Ed776250',
    defaultCurrencies: {
      input: avalanche['eth'],
      output: avalanche['usdt.e'],
    },
    tokens: [
      avalanche['avax'],
      avalanche['usdc.e'],
      avalanche['dai.e'],
      avalanche['usdt.e'],
      avalanche['eth'],
      avalanche['wavax'],
      avalanche['wbtc.e'],
    ],
  },
  56: {
    factoryAddress: '0x8e42f2F4101563bF679975178e880FD87d3eFd4e',
    routerAddress: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
    quoterAddress: '0xd76019A16606FDa4651f636D9751f500Ed776250',
    defaultCurrencies: {
      input: bsc['bnb'],
      output: bsc['usdc'],
    },
    tokens: [bsc['btcb'], bsc['bnb'], bsc['busd'], bsc['usdt'], bsc['eth'], bsc['usdc']],
  },
};

export { basic, networks };
