import type { FC } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';

interface IProps {
  from: 'bg' | 'bgUser';
  inviteCode?: string;
}
const LandingPC: FC<IProps> = ({}) => {
  return <div>PC</div>;
};

export default memo(LandingPC);
