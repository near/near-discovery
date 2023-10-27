import styled from 'styled-components';
import Alert from '@/components/Alert';

const StyledContainer = styled.div<{ mt?: number }>`
  margin-top: ${({ mt }) => mt}px;
`;

function TransactionTips({ mt, count }: { mt?: number; count?: number }) {
  return count ? (
    <StyledContainer mt={mt}>
      <Alert text={`${count} transactions to be continued`} />
    </StyledContainer>
  ) : (
    <div />
  );
}

export default TransactionTips;
