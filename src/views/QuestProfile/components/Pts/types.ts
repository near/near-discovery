import type { Align } from '@/views/QuestLeaderboard/types';

export { Align };

export type Column = {
  label: string;
  width: number;
  key: string;
  gap?: number;
  align?: Align;
};
