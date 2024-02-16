import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 560px;
  background: #000;
`;

export const StyledContent = styled.div`
  width: 1244px;
  margin: 40px auto 0px;
  position: relative;
`;

export const StyledInner = styled.div`
  position: relative;
  z-index: 10;
`;

export const StyledRadialBg = styled.div`
  border-radius: 428px;
  opacity: 0.5;
  background: radial-gradient(50% 50% at 50% 50%, #6889ff 0%, rgba(104, 137, 255, 0) 100%);
  filter: blur(50px);
  width: 428px;
  height: 428px;
  position: absolute;
  z-index: 1;
  left: -214px;
  top: -20px;
`;

export const StyledRadialBg2 = styled.div`
  border-radius: 306px;
  opacity: 0.5;
  background: radial-gradient(50% 50% at 50% 50%, #ebf479 0%, rgba(235, 244, 121, 0) 100%);
  filter: blur(50px);
  width: 306px;
  height: 306px;
  position: absolute;
  z-index: 1;
  right: -100px;
  bottom: -60px;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 165%; /* 59.4px */
  text-transform: capitalize;
  padding: 58px 0px 12px;
`;

export const StyledCard = styled.div`
  width: 100%;
  height: 380px;
  border-radius: 32px;
  border: 1px solid #464b56;
  background: #21232a;
  padding: 28px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const StyledCardImg = styled.img`
  width: 646px;
  height: 323px;
  flex-shrink: 0;
`;

export const StyledCardRight = styled.div``;

export const StyledCardChains = styled.img`
  width: 276px;
  height: 70px;
`;

export const StyledCardTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 508px;
  margin-top: 16px;
`;

export const StyledCardDesc = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
  width: 500px;
`;

export const StyledCardButton = styled.div`
  width: 213px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  color: #02051e;
  text-align: center;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 33px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledCompassIcon = styled.div`
  position: absolute;
  right: 40px;
  top: 76px;
  z-index: 20;
`;

export const StyledWinPtsIcon = styled.div`
  position: absolute;
  right: -62px;
  top: 96px;
  z-index: 20;
`;
