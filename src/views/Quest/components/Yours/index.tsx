import { useRouter } from 'next/navigation';
import { memo } from 'react';
import useAuthCheck from '@/hooks/useAuthCheck';

import { StyledBox, StyledCoin, StyledContainer, StyledLabel, StyledLine, StyledValue } from './styles';

const Yours = ({ info }: any) => {
  const router = useRouter();
  const { check } = useAuthCheck({
    isNeedAk: true,
  });
  return (
    <StyledContainer
      onClick={() => {
        check(() => {
          router.push('/profile?active=pts');
        });
      }}
    >
      <StyledBox>
        <StyledLabel>My PTS</StyledLabel>
        <StyledValue>
          <StyledCoin $size={18} />
          <span>{info?.reward || 0}</span>
        </StyledValue>
      </StyledBox>
      <StyledLine />
      <StyledBox>
        <StyledLabel>My Rank</StyledLabel>
        <StyledValue>#{info?.rank || 0}</StyledValue>
      </StyledBox>
    </StyledContainer>
  );
};

export default memo(Yours);
