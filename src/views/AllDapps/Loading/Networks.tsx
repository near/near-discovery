import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NetworksLoading = ({ length }: any) => {
  return (
    <StyledContainer>
      {new Array(length).fill(1).map((item, i) => (
        <Skeleton key={i} width="147px" height="32px" borderRadius="6px" containerClassName="skeleton" />
      ))}
    </StyledContainer>
  );
};

export default NetworksLoading;
