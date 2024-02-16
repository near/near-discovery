import type { Token } from '@/components/Bridge/types';
import { zkSync } from '@/config/tokens/zkSync';

export const zkSyncTokens = {
  native: zkSync.eth,
  '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4': zkSync.usdc,
  '0x493257fd37edb34451f62edf8d2a0c418852ba4c': zkSync.usdt,
  '0x503234F203fC7Eb888EEC8513210612a43Cf6115': zkSync.lusd,
} as { [key: string]: Token };
