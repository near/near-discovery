export type Record = {
  user: string;
  rank: number;
  pts: number;
  avatar: string;
};

export type Column = {
  label: string;
  width: number;
  key: keyof Record;
  align?: Align;
  gap: number;
};

export type Align = 'left' | 'right' | 'center';

export type Tab = 'leaderboard' | 'quests';
