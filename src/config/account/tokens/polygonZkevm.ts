import type { Token } from '@/components/Bridge/types';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';

export const polygonZkevmTokens = {
  '0xa2036f0538221a77A3937F1379699f44945018d0': polygonZkevm.matic,
  '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035': polygonZkevm.usdc,
  '0x1E4a5963aBFD975d8c9021ce480b42188849D41d': polygonZkevm.usdt,
  '0x27a4BF80C2d63E42437258533dac7eAFF9881bdB': polygonZkevm.mai,
  '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4': polygonZkevm.dai,
} as { [key: string]: Token };
