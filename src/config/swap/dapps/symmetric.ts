import { gnosis } from '@/config/tokens/gnosis';

const basic = {
  name: 'Symmetric',
  logo: 'https://ipfs.near.social/ipfs/bafkreidjjczkheb6w6hdilbqzliytqxgcheycne7h6zmpnzuzflinhgwpu',
  amountOutFn: 'bluebiu.near/widget/Metis.Swap.HummusExchangeAmountOut',
};
const networks = {
  100: {
    routerAddress: '0x24F87b37F4F249Da61D89c3FF776a55c321B2773',
    defaultCurrencies: {
      input: gnosis['weth'],
      output: gnosis['gno'],
    },
    tokens: [
      gnosis['wxdai'],
      gnosis['gno'],
      gnosis['agve'],
      // gnosis['symm'],
      gnosis['usdc'],
      gnosis['dai'],
      gnosis['weth'],
      gnosis['wbtc'],
    ],
    pools: [
      // [
      //   [gnosis['symm'].address, gnosis['gno'].address],
      //   '0xd3078c1568ece597f2df457a4bbf670fb8076e71000200000000000000000002',
      // ],
      [
        [gnosis['weth'].address, gnosis['gno'].address],
        '0x81d167725577d26b020e197b1226380b8189b2b800020000000000000000004b',
      ],
      [
        [gnosis['agve'].address, gnosis['wxdai'].address],
        '0xcbd22f241a29d23f1165fcbe8d50ec32d192d199000200000000000000000015',
      ],
      // [
      //   [gnosis['agve'].address, gnosis['symm'].address],
      //   '0x7fd75e4feab8195e7f41b6ac16064134e3cdbd8e000200000000000000000029',
      // ],
      [
        [gnosis['usdc'].address, gnosis['wxdai'].address],
        '0xa4458034865ba70e4d0fb6f3353d9fa57df2eab5000100000000000000000010',
      ],
      [
        [gnosis['dai'].address, gnosis['usdc'].address],
        '0x8041728c96e13dfbfd62639f976b0d0961b402ec000200000000000000000030',
      ],
      [
        [gnosis['dai'].address, gnosis['usdt'].address, gnosis['usdc'].address],
        '0x40a27a03ad2603cc25e1a4cd4dee1f54ddfc45ba000100000000000000000021',
      ],
      [
        [gnosis['symm'].address, gnosis['wxdai'].address, gnosis['usdc'].address],
        '0x8b78873717981f18c9b8ee67162028bd7479142b000200000000000000000000',
      ],
      [
        [gnosis['agve'].address, gnosis['gno'].address],
        '0xa2f08dff399ed1ef1cb5228c998e256cbc9515c600020000000000000000000a',
      ],
    ],
  },
};

export { basic, networks };
