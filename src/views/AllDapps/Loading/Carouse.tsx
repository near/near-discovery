import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const StyledContainer = styled.div`
  border-radius: 20px;
  background: #1f2229;
  width: 1243px;
  height: 352px;
  flex-shrink: 0;
  padding: 24px;
  box-sizing: border-box;
  margin-bottom: 42px;
`;

const StyledItem = styled.div`
  width: 374px;
  height: 305px;
  flex-shrink: 0;
  border-radius: 20px;
  opacity: 0.5;
  background: #16181d;
  backdrop-filter: blur(5px);
  padding: 24px;
`;

const CarouselLoading = () => {
  return (
    <StyledContainer>
      <StyledItem>
        <Skeleton width="72px" height="72px" borderRadius="16px" containerClassName="skeleton" />
        <Skeleton
          width="332px"
          height="38px"
          borderRadius="6px"
          containerClassName="skeleton"
          style={{ marginTop: '14px' }}
        />
        <Skeleton
          width="208px"
          height="21px"
          borderRadius="6px"
          containerClassName="skeleton"
          style={{ marginTop: '12px' }}
        />
        <Skeleton
          width="332px"
          height="21px"
          borderRadius="6px"
          containerClassName="skeleton"
          style={{ marginTop: '12px' }}
        />
      </StyledItem>
    </StyledContainer>
  );
};

export default CarouselLoading;
