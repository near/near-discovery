import type { Chain } from '@/types';

import chains from '../chains';

export const LANDING_CHAINS: { [key: number]: string } = {
  8453: 'bluebiu.near/widget/Base.Bridge',
  42161: 'bluebiu.near/widget/Arbitrum.Bridge',
  56: 'bluebiu.near/widget/Bsc.Bridge',
  43114: 'bluebiu.near/widget/Avalanche.Bridge',
  59144: 'bluebiu.near/widget/Linea.Bridge',
  1088: 'bluebiu.near/widget/Metis.Bridge',
  10: 'bluebiu.near/widget/Optimism.Bridge',
  137: 'bluebiu.near/widget/Polygon.Bridge',
  1101: 'guessme.near/widget/ZKEVMSwap.zkevm-bridge',
};

export const supportChains = chains as { [key: number]: Chain };
