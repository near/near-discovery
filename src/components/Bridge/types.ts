import type { Token as BasicToken, Chain } from '@/types';

export type { Chain } from '@/types';

export interface Token extends BasicToken {
  poolId?: number;
}

export type SelectClick = (type: 'token' | 'chain', item?: Chain | Token) => void;

export interface Dex {
  icon: string;
  name: string;
  tags: string[];
}

export type SupportDex = 'Stargate';

export interface Trade {
  time: string;
  amount: string;
  gasCost?: string;
  dex: SupportDex;
}
