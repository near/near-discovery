import { motion } from 'framer-motion';
import styled from 'styled-components';

export { StyledCoin } from '@/views/Quest/styles';
export { StyledLabel } from '../Details/styles';

export const StyledContainer = styled.div`
  flex-grow: 1;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledItemContainer = styled.div`
  border-radius: 16px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.2);
  width: 700px;
  box-sizing: border-box;
  padding: 30px 24px 24px;
  margin-top: 20px;
  transition: 0.3s;

  &:hover {
    border: 1px solid #ebf479;
  }
`;

export const StyledItemTop = styled(motion.header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

export const StyledItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const StyledIconBox = styled.div`
  cursor: pointer;
  transition: 0.5s;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
  &.open {
    transform: rotate(90deg);
  }
  .loading {
    animation: loading 1s linear infinite;
  }
  svg {
    vertical-align: inherit;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StyledButton = styled.button`
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  gap: 6px;
  color: #1e2028;
  font-size: 18px;
  font-weight: 700;
  margin-top: 32px;
  transition: 0.3s;

  &:disabled {
    background: #7c7f96;
  }
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledProcessBars = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 40px;
`;

export const StyledExpandContainer = styled(motion.section)`
  padding-left: 34px;
`;

export const StyledExpand = styled.div`
  padding-top: 18px;
`;

export const StyledDesc = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
`;

export const StyledDapps = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const StyledDapp = styled(motion.div)`
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: rgba(55, 58, 83, 0.2);
  height: 48px;
  padding: 0px 12px 0px 9px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-top: 12px;
`;

export const StyledDappIcon = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
`;

export const StyledMore = styled.div`
  cursor: pointer;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  margin-top: 24px;
`;

export const StyledExpandButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledExpandButton = styled.button`
  border-radius: 8px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  width: 102px;
  height: 36px;
  flex-shrink: 0;
  color: #1e2028;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  &:not(:disabled):hover {
    opacity: 0.9;
  }
  &:not(:disabled):active {
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

export const RefreshTips = styled(motion.div)`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: -30px;
  top: -34px;
  z-index: 30;
  border-radius: 6px;
  border: 1px solid #373a53;
  background: #262836;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  width: 237px;
  height: 32px;
  flex-shrink: 0;
  .text {
    position: relative;
    z-index: 10;
    color: #979abe;
    font-family: Gantari;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const StyledTimerBox = styled.div`
  display: flex;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  gap: 20px;
`;
