import styled from 'styled-components';
import { motion } from 'framer-motion';

export { StyledCoin } from '@/views/Quest/styles';
export { StyledMedal, StyledSteps } from '../../styles';

export const StyledContainer = styled.div`
  position: relative;
`;

export const StyledContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

export const StyledBg = styled.div`
  position: absolute;
  z-index: 1;
  border-radius: 431px;
  opacity: 0.3;
  background: #a55fff;
  filter: blur(100px);
  width: 431px;
  height: 431px;
  top: -215px;
  left: 0px;
`;

export const StyledSmallCircle = styled.div`
  width: 975px;
  height: 975px;
  border-radius: 975px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0.3;
  position: absolute;
  z-index: 2;
  top: -930px;
  left: -376px;
`;

export const StyledBigCircle = styled.div`
  width: 1299px;
  height: 1111px;
  border-radius: 1299px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0.3;
  position: absolute;
  z-index: 2;
  top: -990px;
  left: -550px;
`;

export const StyledAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const StyledName = styled.div`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
`;

export const StyledAddress = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  margin-top: 10px;
`;

export const StyledLabels = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 35px;
`;

export const StyledLabel = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(235, 244, 121, 0.3);
  background: #1c1d29;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  height: 48px;
  box-sizing: border-box;
`;

export const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const StyledLabelsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledSocialsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledSocialItem = styled(motion.button)`
  border-radius: 20px;
  border: 1px solid #21232a;
  background: rgba(22, 24, 29, 0.5);
  backdrop-filter: blur(3px);
  height: 40px;
  flex-shrink: 0;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 8px;
  color: #373a53;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  position: relative;
  .telegram_button {
    position: absolute;
    left: 0px;
    right: 0px;
    opacity: 0;

    width: 100%;
    height: 100%;
    overflow: hidden;
    iframe {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
`;
