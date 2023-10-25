import { SupportDex } from '@/components/Bridge/types';
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
} as {
  [key: number]: {
    dex: SupportDex;
    dstId: number;
    router: string;
    ethRouter?: string;
  };
};
