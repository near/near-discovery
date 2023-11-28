import {
  StyledTotalBox,
  StyledTotalItem,
  StyledTotalLabel,
  StyledTotalValue,
  StyledCoin,
  StyledFist,
  StyledPerson,
} from './styles';

import { memo } from 'react';

import { formateValueWithThousandSeparator } from '@/utils/formate';

const Total = () => {
  return (
    <StyledTotalBox>
      <StyledTotalItem>
        <StyledTotalLabel>Total PTS</StyledTotalLabel>
        <StyledTotalValue>
          <StyledCoin $size={21} />
          <span>79,245,613</span>
        </StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Total Users</StyledTotalLabel>
        <StyledTotalValue>
          <StyledPerson $size={15} />
          <span>79,245,613</span>
        </StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Total quest execution</StyledTotalLabel>
        <StyledTotalValue>
          <StyledFist $size={24} />
          <span>79,245,613</span>
        </StyledTotalValue>
      </StyledTotalItem>
    </StyledTotalBox>
  );
};

export default memo(Total);
