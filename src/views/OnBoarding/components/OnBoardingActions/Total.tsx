import { memo } from 'react';
import { formateValueWithThousandSeparator } from '@/utils/formate';
import { StyledTotal, StyledTotalItem, StyledTotalLabel, StyledTotalValue } from './styles';

const Total = () => {
  return (
    <StyledTotal>
      <StyledTotalItem>
        <StyledTotalLabel>Total Execution</StyledTotalLabel>
        <StyledTotalValue>502,45</StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Total trading Value</StyledTotalLabel>
        <StyledTotalValue>$10,502.45</StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Total Address</StyledTotalLabel>
        <StyledTotalValue>502,45</StyledTotalValue>
      </StyledTotalItem>
    </StyledTotal>
  );
};

export default memo(Total);
