import { memo } from 'react';
import GoMore from '@/components/GoMore';
import useTrends from '../../hooks/useTrends';
import Item from './Item';
import { StyledContainer, StyledHeader, StyledTitle, StyledTitleImg, StyledList } from './styles';

const Trends = ({ chain }: any) => {
  const { loading, list } = useTrends(chain.chainId, 4);
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>
          <StyledTitleImg src="/images/onboarding/trends.png" />
          <div>Trends</div>
        </StyledTitle>
        <GoMore label="View all" path={`/onboarding/trends/${chain.chainId}`} />
      </StyledHeader>
      <StyledList>
        {list?.map((item: any, i: number) => <Item key={Date.now() + i} {...item} bgColor={chain.bgColor} />)}
      </StyledList>
    </StyledContainer>
  );
};

export default memo(Trends);
