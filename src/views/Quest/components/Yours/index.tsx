import { useRouter } from 'next/navigation';
import { memo } from 'react';

import { StyledBox, StyledCoin, StyledContainer, StyledLabel, StyledLine, StyledValue } from './styles';

const Yours = ({ info }: any) => {
  const router = useRouter();
  return (
    <StyledContainer
      onClick={() => {
        router.push(`/profile?active=pts`);
      }}
    >
      <StyledBox>
        <StyledLabel>Your PTS</StyledLabel>
        <StyledValue>
          <StyledCoin $size={18} />
          <span>{info?.reward || 0}</span>
        </StyledValue>
      </StyledBox>
      <StyledLine />
      <StyledBox>
        <StyledLabel>Your Rank</StyledLabel>
        <StyledValue>#{info?.rank || 0}</StyledValue>
      </StyledBox>
    </StyledContainer>
  );
};

export default memo(Yours);
