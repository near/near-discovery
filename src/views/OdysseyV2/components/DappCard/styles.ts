import styled from 'styled-components';

export const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledDappWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const StyledDappIcon = styled.img`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
`;

export const StyledDappTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledDappTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledDappDesc = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const StyledExecution = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const StyledFooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  align-items: center;
`;
