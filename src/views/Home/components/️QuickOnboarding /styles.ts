import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 152px;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: 165%; /* 99px */
  text-transform: capitalize;
`;

export const StyledSubtitle = styled.div`
  color: #979abe;
  text-align: center;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 36px */
  text-align: center;
  width: 900px;
  margin-top: 10px;
`;

export const StyledImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  margin-top: 40px;
`;

export const StyledImage = styled.img`
  width: 784px;
  height: 434.554px;
  flex-shrink: 0;
`;

export const StyledCards = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledCard = styled.div`
  width: 400px;
  height: 207px;
  flex-shrink: 0;
  border-radius: 20px;
  position: relative;
  padding: 30px 26px 30px 30px;
  box-sizing: border-box;
  overflow: hidden;
`;

export const StyledCardIcon = styled.img`
  width: 150px;
  opacity: 0.05;
  position: absolute;
  left: 30px;
  bottom: -10px;
  z-index: 1;
`;

export const StyledCardBg = styled.div`
  background-image: url('/images/home/quick_onboarding_card_bg.png');
  position: absolute;
  right: 0px;
  bottom: 0px;
  z-index: 1;
  width: 160px;
  height: 160px;
  opacity: 0.5;
`;

export const StyledCardContent = styled.div`
  position: relative;
  z-index: 5;
`;

export const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledCardTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledCardName = styled.div`
  font-size: 24px;
`;

export const StyledCardArrow = styled.div`
  cursor: pointer;
`;
