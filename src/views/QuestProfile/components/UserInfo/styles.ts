import styled from 'styled-components';

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
  justify-content: center;
  align-items: center;
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
  left: calc(50% - 215px);
`;

export const StyledSmallCircle = styled.div`
  width: 975px;
  height: 975px;
  border-radius: 975px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0.3;
  position: absolute;
  z-index: 2;
  top: -800px;
  left: calc(50% - 486px);
`;

export const StyledBigCircle = styled.div`
  width: 1487px;
  height: 1271px;
  border-radius: 1487px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0.3;
  position: absolute;
  z-index: 2;
  top: -1000px;
  left: calc(50% - 784px);
`;

export const StyledAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

export const StyledAddress = styled.div`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  margin-top: 30px;
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
