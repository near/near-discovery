import { memo } from 'react';

import { formateValueWithThousandSeparator } from '@/utils/formate';

import {
  StyledCoin,
  StyledFist,
  StyledPerson,
  StyledTotalBox,
  StyledTotalItem,
  StyledTotalLabel,
  StyledTotalValue,
} from './styles';

const Total = ({ info = {} }: any) => {
  return (
    <StyledTotalBox>
      <StyledTotalItem>
        <StyledTotalLabel>Total PTS</StyledTotalLabel>
        <StyledTotalValue>
          <StyledCoin $size={21} />
          <span>{formateValueWithThousandSeparator(info.total_reward || 0, 0)}</span>
        </StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Total Users</StyledTotalLabel>
        <StyledTotalValue>
          <StyledPerson $size={15} />
          <span>{formateValueWithThousandSeparator(info.total_users || 0, 0)}</span>
        </StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Total quest execution</StyledTotalLabel>
        <StyledTotalValue>
          <StyledFist $size={24} />
          <span>{formateValueWithThousandSeparator(info.total_quest_execution || 0, 0)}</span>
        </StyledTotalValue>
      </StyledTotalItem>
    </StyledTotalBox>
  );
};

export default memo(Total);
