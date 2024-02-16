import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-top: 42px;
  .gray {
    color: #979abe;
  }
`;

export const StyledTotal = styled.div`
  width: 100%;
  height: 108px;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(10px);
  padding: 0px 70px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

export const StyledTotalItem = styled.div`
  flex-grow: 1;
  text-align: center;
`;

export const StyledTotalLabel = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  padding-top: 10px;
`;

export const StyledTotalValue = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 45px */
  text-transform: capitalize;
  padding-top: 5px;
`;

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

export const StyledAction = styled.div`
  width: 299px;
  height: 218px;
  flex-shrink: 0;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
`;

export const StyledActionColorBg = styled.div`
  position: absolute;
  left: 10px;
  top: 0px;
  z-index: 2;
  width: 305px;
  height: 162px;
`;

export const StyledActionContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  padding: 29px 10px 17px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledActionBg = styled.div`
  position: absolute;
  left: 140px;
  top: 58px;
  width: 100%;
  height: 100%;
  background-image: url(/images/onboarding/card_bg.png);
  background-repeat: no-repeat;
  z-index: 1;
  opacity: 0.1;
`;

export const StyledActionTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

export const StyledActionSubTitle = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 18px;

  .num {
    color: #979abe;
  }
`;

export const StyledActionDesc = styled.div`
  color: #979abe;
  text-align: right;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 32px;
`;

export const StyledActionButton = styled.div`
  width: 258px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e2028;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 12px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;
