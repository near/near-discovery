import styled from 'styled-components';

export { LoadingWrapper, Empty } from '../../styles';

export const StyledContainer = styled.div`
  padding-top: 40px;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  text-transform: capitalize;
`;

export const StyledLabels = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const StyledLabel = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #1c1d29;
  width: 127px;
  height: 40px;
  flex-shrink: 0;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
  text-align: center;
`;

export const StyledQuests = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;
