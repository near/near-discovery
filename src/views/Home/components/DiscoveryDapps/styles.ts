import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1244px;
  margin: 86px auto 0px;
  overflow: hidden;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 165%; /* 59.4px */
`;

export const StyledTabsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  margin-top: 12px;
  box-sizing: border-box;
  border-bottom: 1px solid #21232a;
`;

export const StyledTabs = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTab = styled.div`
  padding: 14px 38px;
  color: #979abe;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-bottom: 4px solid transparent;
  cursor: pointer;

  &.active {
    border-bottom-color: #ebf479;
    color: #ffffff;
  }
`;

export const StyledDesc = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
  margin-top: 20px;
`;
