import { metis } from '@/config/tokens/metis';

const basic = {
  name: 'Hermes',
  logo: 'https://ipfs.near.social/ipfs/bafybeiamt2iuucwebbklhvmq5dz3hir63u3ovkvusbuz3k2wpsiwhulnzy',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.HermesAmountOut',
};
const networks = {
  1088: {
    factoryAddress: '0x633a093C9e94f64500FC8fCBB48e90dd52F6668F',
    routerAddress: '0x2d4F788fDb262a25161Aa6D6e8e1f18458da8441',
    defaultCurrencies: {
      input: metis['eth'],
      output: metis['m.usdc'],
    },
    tokens: [metis['weth'], metis['metis'], metis['m.usdc'], metis['m.usdt'], metis['hermes'], metis['m.dai']],
  },
};

export { basic, networks };
