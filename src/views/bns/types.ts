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

// 0: 未查询 1: 查询中 1: 查询成功（未注册） 2: 查询失败（已注册）
export type QueryNameStatusType = 0 | 1 | 2 | 3

// 0: 未注册 1: 注册中 2: 注册成功 3: 注册失败
export type RegisterStatusType = 0 | 1 | 2 | 3

// 0: 列表展示 1: 添加币类型 2: 确认保存
export type SaveNetworkStatusType = 0 | 1 | 2