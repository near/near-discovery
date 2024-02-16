import { memo } from 'react';
import { formateValueWithThousandSeparator } from '@/utils/formate';
import useSummary from '../../hooks/useSummary';
import { StyledTotal, StyledTotalItem, StyledTotalLabel, StyledTotalValue } from './styles';

const Total = ({ chainId }: any) => {
  const { info } = useSummary(chainId);

  return (
    <StyledTotal>
      <StyledTotalItem>
        <StyledTotalLabel>Total Execution</StyledTotalLabel>
        <StyledTotalValue>
          {info?.total_execution ? formateValueWithThousandSeparator(info.total_execution, 0) : '0'}
        </StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Total trading Value</StyledTotalLabel>
        <StyledTotalValue>
          $ {info?.total_trading_value ? formateValueWithThousandSeparator(info.total_trading_value, 2) : '0'}
        </StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Total Address</StyledTotalLabel>
        <StyledTotalValue>
          {info?.total_address ? formateValueWithThousandSeparator(info.total_address, 0) : '0'}
        </StyledTotalValue>
      </StyledTotalItem>
    </StyledTotal>
  );
};

export default memo(Total);
