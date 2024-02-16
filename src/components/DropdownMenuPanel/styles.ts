import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MenuContainer = styled(motion.div)`
  z-index: 100;
  position: absolute;
  left: 0;
  top: 78px;
  background: #16181d;
  width: 100%;
  padding: 40px 0px;
  color: #ffffff;
  font-family: Gantari;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.25);

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

export const MaskLayer = styled(motion.div)`
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
  margin-top: 30px;
  border-top: 1px solid #21232a;
  padding-top: 30px;
`;

export const StyledMenuItem = styled.div`
  display: flex;
  cursor: pointer;
  flex-grow: 1;
  gap: 16px;
`;
export const StyledMenuIconWrapper = styled.div`
  line-height: 62px;
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
