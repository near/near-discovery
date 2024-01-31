import styled from 'styled-components';

export const MenuContainer = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  top: 78px;
  background: #16181d;
  width: 100%;
  padding: 40px 0px;
  color: #ffffff;
  font-family: Gantari;
  animation: slideUp 0.5s ease forwards;
  &.show {
    animation: slideDown 0.5s ease forwards;
  }
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  .explore-link {
    color: #ffffff;
    text-decoration: none;
    height: fit-content;
  }
`;

export const MenuContent = styled.div`
  width: 1244px;
  margin: 0 auto;
`;

export const MaskLayer = styled.div`
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  backdrop-filter: blur(6px);
`;

export const StyledExplores = styled.div`
  display: flex;
  gap: 86px;
`;

export const StyledExplore = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
`;

export const StyledExploreTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const StyledExploreDesc = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
  max-width: 260px;
`;

export const StyledExploreItems = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 16px 20px;
`;

export const StyledExploreItem = styled.div`
  width: calc(50% - 20px);
  font-size: 16px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const StyledExploreArrow = styled.div`
  display: inline-block;
  margin-left: 12px;
  img {
    margin-top: 24px;
  }
`;

export const StyledMenu = styled.div`
  display: flex;
  gap: 86px;
  margin-top: 60px;
`;

export const StyledMenuItem = styled.div`
  display: flex;
  cursor: pointer;
`;
export const StyledMenuIconWrapper = styled.div`
  margin-right: 20px;
  line-height: 62px;
  width: 42px;
  flex-shrink: 0;
`;

export const StyledMenuTitle = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const StyledMenuLock = styled.div`
  border-radius: 10px;
  border: 1px solid #16181d;
  background: #373a53;
  width: 51px;
  height: 20px;
  flex-shrink: 0;
  color: #ebf479;
  font-family: Gantari;
  font-size: 12px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
