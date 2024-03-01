import styled from 'styled-components';

export const StyledContainer = styled.div`
  margin: 20px auto 0px;
  width: 1188px;
`;

export const StyledContent = styled.div`
  padding-top: 20px;
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledCardTitle = styled.div`
  width: 306px;
  height: 62px;
  flex-shrink: 0;
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

export const StyledCardFooter = styled.div`
  margin-top: 28px;
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  align-items: center;
`;
