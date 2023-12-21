import { motion } from 'framer-motion';
import styled from 'styled-components';

export { StyledCoin } from '../../styles';

export const StyledContainer = styled(motion.div)<{ $isCampaign?: boolean; $mt?: number }>`
  border-radius: 20px;
  border: 1px solid #373a53;
  background: #2c2e3e;
  width: 300px;
  height: 186px;
  flex-shrink: 0;
  padding: 14px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ $isCampaign }) =>
    $isCampaign &&
    `
  background: radial-gradient(100% 100% at 0% 0%, #AE92FF 0%, #6D2DF3 100%);
  `}

  ${({ $mt }) => $mt && `margin-top: ${$mt}px`}
`;

export const StyledTask = styled.div`
  display: flex;
  gap: 14px;
  flex-grow: 1;
  max-height: 100px;
  overflow: hidden;
`;

export const StyledIconBox = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

export const StyledTaskName = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  text-transform: capitalize;
`;

export const StyledTaskDesc = styled.div<{ $isCampaign?: boolean }>`
  color: ${({ $isCampaign }) => ($isCampaign ? 'rgba(255,255,255,0.6)' : '#979abe')};
  font-size: 15px;
  font-weight: 400;
  line-height: 120%;
  margin-top: 10px;
`;

export const StyledProcessBars = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledTags = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
`;

export const StyledTag = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  height: 26px;
  flex-shrink: 0;
  padding: 0px 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledLive = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(32, 34, 47, 0.8);
  width: 53px;
  height: 26px;
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
`;

export const StyledCalimable = styled.div`
  color: #ebf479;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`;
