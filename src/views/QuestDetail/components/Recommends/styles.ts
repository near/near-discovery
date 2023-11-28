import styled from 'styled-components';

export { StyledTitle } from '../../styles';

export const StyledContainer = styled.div`
  margin-top: 100px;
  padding-top: 30px;
  border-top: 1px solid #26282f;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const StyledLeftButton = styled.div`
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

export const StyledRightButton = styled(StyledLeftButton)``;

export const StyledRecommendList = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 15px;
  flex-direction: nowrap;
  width: 100%;
  overflow-x: auto;
`;
