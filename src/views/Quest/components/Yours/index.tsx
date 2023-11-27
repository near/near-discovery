import { StyledContainer, StyledBox, StyledLabel, StyledValue, StyledCoin, StyledLine } from './styles';

import { memo } from 'react';

const Yours = () => {
  return (
    <StyledContainer>
      <StyledBox>
        <StyledLabel>Your PTS</StyledLabel>
        <StyledValue>
          <StyledCoin $size={18} />
          <span>535</span>
        </StyledValue>
      </StyledBox>
      <StyledLine />
      <StyledBox>
        <StyledLabel>Your Rank</StyledLabel>
        <StyledValue>#2345</StyledValue>
      </StyledBox>
    </StyledContainer>
  );
};

export default memo(Yours);
