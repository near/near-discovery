import { memo } from 'react';
import { StyledContainer, StyledBox, StyledLabel, StyledValue, StyledCoin, StyledLine } from './styles';
import useUserInfo from '@/views/QuestLeaderboard/hooks/useUserInfo';

const Yours = () => {
  const { loading, info } = useUserInfo();
  console.log(info);
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
