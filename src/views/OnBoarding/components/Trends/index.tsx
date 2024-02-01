import { memo } from 'react';
import GoMore from '@/components/GoMore';
import Item from './Item';
import { StyledContainer, StyledHeader, StyledTitle, StyledTitleImg, StyledList } from './styles';

const Trends = ({ activities }: any) => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>
          <StyledTitleImg src="/images/onboarding/trends.png" />
          <div>Trends</div>
        </StyledTitle>
        <GoMore label="View all" path="" />
      </StyledHeader>
      <StyledList>{}</StyledList>
    </StyledContainer>
  );
};

export default memo(Trends);
