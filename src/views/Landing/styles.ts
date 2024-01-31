import { motion } from 'framer-motion';
import styled from 'styled-components';

export { StyledCoin } from '@/views/Quest/styles';

export const StyledContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 80px;
  padding-top: 50px;
  max-width: 1200px;
`;
export const StyledLeftPanel = styled.div`
  max-width: 550px;
  padding-top: 80px;
`;
export const StyledTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  display: flex;
  align-items: center;
  .coin {
    margin: 0px 6px;
  }
  .coin_color {
    color: #ebf479;
  }
`;
export const StyledDesc = styled.div`
  margin-top: 17px;
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
`;
export const StyledStep = styled.div<{ $disable?: boolean }>`
  margin-top: 34px;
  ${({ $disable }) => $disable && `opacity: 0.5;`}
`;
export const StyledStepHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const StyledStepTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const StyledStepCoins = styled.div`
  color: #ebf479;
  text-align: right;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const StyledStepDesc = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 19.2px */
  margin-top: 8px;
`;
export const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 34px;
`;
export const StyledClaimButton = styled(motion.button)`
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #ebf479;
  transition: 0.3s;
  border: none;
  color: #02051e;
  text-align: center;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  opacity: 1;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    background: #7c7f96;
    cursor: not-allowed;
  }
`;
export const StyledSkipButton = styled(motion.button)`
  width: 30%;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #979abe;
  background: transparent;
  color: #979abe;
  text-align: center;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const StyledRightPanel = styled.div`
  padding-top: 80px;
`;
export const StyledRightImg = styled.img``;

export const StyledProcessBars = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 40px;
`;
