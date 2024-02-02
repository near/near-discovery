import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  height: 274px;
  animation: chainDetailUp 0.5s ease forwards;
  &.more {
    animation: chainDetailDown 0.5s ease forwards;
  }

  @keyframes chainDetailDown {
    0% {
      transform: translateY(-10px);
      height: 274px;
    }
    100% {
      transform: translateY(0);
      height: 556px;
    }
  }
  @keyframes chainDetailUp {
    0% {
      transform: translateY(0);
      height: 556px;
    }
    100% {
      transform: translateY(-10px);
      height: 274px;
    }
  }
`;
export const StyledBox = styled.div`
  position: relative;
  height: 100%;
  padding-top: 30px;
  overflow: hidden;
  box-sizing: border-box;

  .token-img {
    width: 24px;
  }
`;
export const StyledContent = styled.div`
  position: relative;
  z-index: 20;
  width: 1244px;
  margin: 0 auto;
`;
export const StyledBgWrapper = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  width: 100%;
  height: calc(100% - 30px);
`;

export const StyledBg = styled.div`
  position: absolute;
  z-index: 5;
  bottom: 0px;
`;
export const StyledBgImg = styled.img<{ more: boolean }>`
  width: 300px;
  position: absolute;
  left: 20%;
  z-index: 2;
  bottom: ${({ more }) => (more ? '-10px' : '-40px')};
  opacity: 0.1;
`;

export const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 46px;
`;
export const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
`;
export const StyledChainLogoWrapper = styled.div`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledChainLogo = styled.img`
  width: 48px;
`;

export const StyledChainName = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const StyledAction = styled.div<{ width?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: ${({ width }) => width || '125px'};
  height: 46px;
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
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
export const StyledActionText = styled.div`
  width: 96px;
  flex-shrink: 0;
  text-align: left;
  margin-right: -10px;
`;
export const StyledMoreButton = styled.div`
  position: absolute;
  z-index: 12;
  right: calc(50% - 626px);
  bottom: -15px;
`;

export const StyledMorePanel = styled.div``;
export const StyledTags = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const StyledTag = styled.div`
  width: 149px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 12px;
  background: rgba(55, 58, 83, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
`;
export const StyledTagLabel = styled.div`
  color: #979abe;
  text-align: center;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StyledTagValue = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const StyledChainDesc = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 580px;
  margin-top: 30px;
`;
