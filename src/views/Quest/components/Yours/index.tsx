import { memo } from 'react';

import useUserInfo from '@/views/QuestLeaderboard/hooks/useUserInfo';

import { StyledBox, StyledCoin, StyledContainer, StyledLabel, StyledLine, StyledValue } from './styles';

const Yours = () => {
  const { loading, info } = useUserInfo({});

  return (
    <StyledContainer>
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
