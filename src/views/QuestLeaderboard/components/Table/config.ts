import type { Column } from '../../types';

export const COLUMNS: Column[] = [
  {
    label: 'Rank',
    width: 20,
    key: 'rank',
    gap: 10,
  },
  {
    label: 'Address',
    width: 60,
    key: 'user',
    align: 'left',
    gap: 9,
  },
  {
    label: 'PTS',
    width: 20,
    key: 'pts',
    align: 'right',
    gap: 6,
  },
];

export const RANK_COLORS: { [key: number]: [string, string] } = {
  1: ['#FFEE98', '#E9AE45'],
  2: ['#D8E7FF', '#85628A'],
  3: ['#E7BA9A', '#805F48'],
};
