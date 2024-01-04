import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Orion',
  logo: 'https://ipfs.near.social/ipfs/bafkreidzcztdcx6mez6hhhmhglfv7m7vh45ijgshmikhnforoksmbczlrq',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.ApeAmountOut',
};
const networks = {
  56: {
    factoryAddress: '0xE52cCf7B6cE4817449F2E6fA7efD7B567803E4b4',
    routerAddress: '0x45A664993f6c3e978A1257c6EF7bBB512af9F098',
    defaultCurrencies: {
      input: bsc['eth'],
      output: bsc['usdc'],
    },
    tokens: [bsc['eth'], bsc['bnb'], bsc['inj'], bsc['orn'], bsc['usdt'], bsc['busd'], bsc['usdc']],
  },
};

export { basic, networks };
