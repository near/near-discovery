import styled from 'styled-components';

export { StyledTotal, StyledTotalItem, StyledTotalLabel, StyledTotalValue } from '../OnBoardingActions/styles';

export const StyledContainer = styled.div`
  padding-top: 42px;
`;

export const StyledTotalButton = styled.button`
  width: 165px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  float: right;

  &:disabled {
    background: linear-gradient(180deg, #5f614d 0%, #3a3d11 100%);
  }
  &:not(disabled):hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

export const StyledEmpty = styled.div`
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StyledEmptyTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-family: Montserrat;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const StyledEmptyImg = styled.img`
  width: 39px;
  height: 39px;
  flex-shrink: 0;
`;

export const StyledEmptyDesc = styled.div`
  color: #979abe;
  text-align: center;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 17px;
`;

export const StyledEmptyItems = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
  margin-top: 20px;
`;

export const StyledEmptyItem = styled.div`
  width: 280px;
  height: 92px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 10px;
  box-sizing: border-box;
  color: #979abe;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 16px;
  border: 1px dashed rgba(238, 243, 188, 0.3);
`;

export const StyledTable = styled.div`
  margin-top: 20px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(10px);
`;

export const StyledTableHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0px 17px 0px 27px;
  box-sizing: border-box;
`;

export const StyledTableBody = styled.div`
  max-height: 375px;
  overflow-y: auto;
`;

export const StyledTableRow = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0px 17px 0px 27px;
  box-sizing: border-box;
  transition: 0.3s;

  &:hover {
    background-color: #2c2e3e;
  }
  &:last-child {
    border-radius: 0px 0px 20px 20px;
  }
`;

export const StyledTableAction = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const StyledTableDapp = styled.div`
  display: flex;
  gap: 6px;
`;

export const StyledTableDappImg = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 6px;
`;

export const StyledTableDappName = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledTableExecution = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration-line: underline;
`;

export const StyledExecutionButton = styled.button`
  width: 158px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  cursor: pointer;
  border: none;
  transition: 0.3s;
  color: #1e2028;
  text-align: center;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

export const StyledClean = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;
