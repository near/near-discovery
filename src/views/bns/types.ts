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
export type StyledFlexType = {
  $direction?: string;
  $wrap?: string;
  $align?: string;
  $justify?: string;
  $gap?: string;
}
export type StyledButtonType = {
  $width?: string;
  $height?: string;
  $background?: string;
  $borderRadius?: string;
  $borderWidth?: string;
  $borderStyle?: string;
  $borderColor?: string;
}
export type Align = 'left' | 'right' | 'center';

export type Tab = 'leaderboard' | 'quests';

export type QueryNameStatusType = 0 | 1 | 2 | 3

export type RegisterStatusType = 0 | 1 | 2 | 3

export type SaveNetworkStatusType = 0 | 1 | 2