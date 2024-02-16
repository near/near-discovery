import { memo } from 'react';
import { useRouter } from 'next/router';
import { formateValueWithThousandSeparator } from '@/utils/formate';
import useMySummary from '../../hooks/useMySummary';
import { StyledTotal, StyledTotalItem, StyledTotalLabel, StyledTotalValue, StyledTotalButton } from './styles';

const Total = ({ chainId }: any) => {
  const router = useRouter();
  const { loading, info } = useMySummary(chainId);
  return (
    <StyledTotal>
      <StyledTotalItem>
        <StyledTotalLabel>Your Execution</StyledTotalLabel>
        <StyledTotalValue>
          {' '}
          {info?.total_execution ? formateValueWithThousandSeparator(info.total_execution, 0) : '-'}
        </StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Your trading Value</StyledTotalLabel>
        <StyledTotalValue>
          $ {info?.total_trading_value ? formateValueWithThousandSeparator(info.total_trading_value, 2) : '0'}
        </StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Active Days</StyledTotalLabel>
        <StyledTotalValue>
          {' '}
          {info?.active_days ? formateValueWithThousandSeparator(info.active_days, 0) : '0'}
        </StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalButton
          onClick={() => {
            router.push(`/onboarding/execute-records/${chainId}`);
          }}
          disabled={info?.total_execution === 0}
          data-bp="100131-003"
        >
          Execute Records
        </StyledTotalButton>
      </StyledTotalItem>
    </StyledTotal>
  );
};

export default memo(Total);
