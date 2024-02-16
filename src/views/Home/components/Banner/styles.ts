import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
`;

export const StyledContent = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

export const StyledBgContainer = styled.div`
  opacity: 0.1;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100vw;
  z-index: 1;
  overflow: hidden;
`;

export const StyledBgBoxWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledBgBox = styled.div`
  padding-top: 114px;

  &.animation {
    display: flex;
    gap: 80px;
    align-items: center;
  }
  &.right {
    animation: 60s linear 0s infinite running home-bg-slidin;
  }
  &.left {
    animation: 60s linear 0s infinite running home-bg-slidout;
  }

  @keyframes home-bg-slidin {
    0% {
      transform: translateX(-50%);
    }

    100% {
      transform: translateX(0%);
    }
  }

  @keyframes home-bg-slidout {
    0% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(-50%);
    }
  }
`;

export const StyledBgBoxList = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
`;

export const StyledBgIcon = styled.img`
  width: 70px;
  flex-shrink: 0;
`;

export const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledSubTitleWrapper = styled.div`
  width: 1010px;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 90px */
  text-transform: capitalize;
`;

export const StyledSubTitleBg = styled.div`
  background-image: url(/images/home/subtitle_bg.png);
  background-repeat: no-repeat;
  background-size: 100%;
  width: 707px;
  height: 124px;
  flex-shrink: 0;
  color: #000;
  margin: -20px auto 0px;
  line-height: 200%;
`;

export const StyledPower = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 161.2%; /* 38.688px */
`;
