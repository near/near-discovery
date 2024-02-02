import { memo } from 'react';
import { useRouter } from 'next/router';
import { formateValueWithThousandSeparator } from '@/utils/formate';
import { StyledTotal, StyledTotalItem, StyledTotalLabel, StyledTotalValue, StyledTotalButton } from './styles';

const Total = ({ chainId }: any) => {
  const router = useRouter();
  return (
    <StyledTotal>
      <StyledTotalItem>
        <StyledTotalLabel>Your Execution</StyledTotalLabel>
        <StyledTotalValue>502,45</StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Your trading Value</StyledTotalLabel>
        <StyledTotalValue>$10,502.45</StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalLabel>Active Days</StyledTotalLabel>
        <StyledTotalValue>10,502.45</StyledTotalValue>
      </StyledTotalItem>
      <StyledTotalItem>
        <StyledTotalButton
          onClick={() => {
            router.push(`/onboarding/execute-records/${chainId}`);
          }}
          data-bp="100131-003"
        >
          Execute Records
        </StyledTotalButton>
      </StyledTotalItem>
    </StyledTotal>
  );
};

export default memo(Total);
