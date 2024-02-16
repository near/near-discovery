import type { SupportDex } from '@/components/Bridge/types';
export { tokens } from './tokens';
export { supportChains as chains } from './chains';

export const chainCofig = {
  8453: {
    dex: 'Stargate',
    dstId: 184,
    router: '0x45f1A95A4D3f3836523F5c83673c797f4d4d263B',
    ethRouter: '0x50B6EbC2103BFEc165949CC946d739d5650d7ae4',
  },
  1: {
    dex: 'Stargate',
    dstId: 101,
    router: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
    ethRouter: '0x150f94B44927F078737562f0fcF3C95c01Cc2376',
  },
  137: {
    dex: 'Stargate',
    dstId: 109,
    router: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
  },
  42161: {
    dex: 'Stargate',
    dstId: 110,
    router: '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
    ethRouter: '0xbf22f0f184bCcbeA268dF387a49fF5238dD23E40',
  },
  56: {
    dex: 'Stargate',
    dstId: 102,
    router: '0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8',
  },
  43114: {
    dex: 'Stargate',
    dstId: 106,
    router: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
  },
  59144: {
    dex: 'Stargate',
    dstId: 183,
    router: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
    ethRouter: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
  },
  1088: {
    dex: 'Stargate',
    dstId: 151,
    router: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
  },
  10: {
    dex: 'Stargate',
    dstId: 111,
    router: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
    ethRouter: '0xB49c4e680174E331CB0A7fF3Ab58afC9738d5F8b',
  },
  324: {
    dex: 'Lifi',
    dstId: -1,
    router: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
    ethRouter: '0xB49c4e680174E331CB0A7fF3Ab58afC9738d5F8b',
  },
} as {
  [key: number]: {
    dex: SupportDex;
    dstId: number;
    router: string;
    ethRouter?: string;
  };
};
