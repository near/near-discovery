import { bsc } from '@/config/tokens/bsc';
const basic = {
  name: 'THENA V1',
  logo: 'https://ipfs.near.social/ipfs/bafkreidps2jipljarabsxbqtiuj6lyupfhvpsesiffmsjzjt4zb73r7qfq',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ChronosV1AmountOut',
};
const networks = {
  56: {
    factoryAddress: '0xAAA35aaEa18B0187E82A3A7f2996C9ee7Bad9696',
    routerAddress: '0xd4ae6eca985340dd434d38f470accce4dc78d109',
    defaultCurrencies: {
      input: bsc['eth'],
      output: bsc['usdc'],
    },
    tokens: [
      bsc['bnb'],
      bsc['the'],
      bsc['bscusd'],
      bsc['livethe'],
      bsc['ankrbnb'],
      bsc['eth'],
      bsc['usdc'],
      bsc['frxeth'],
      bsc['bnbx'],
      bsc['btcb'],
      bsc['stkbnb'],
    ],
  },
};

export { basic, networks };
