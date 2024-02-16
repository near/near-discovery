import styled from 'styled-components';

export { StyledLeftButton } from '../Recommends/styles';

export const StyledContent = styled.div`
  padding: 80px 0px 42px;
  border-radius: 32px;
  border: 1px solid #373a53;
  background: #262836;
  text-align: center;
  position: relative;
  width: 500px;
`;

export const StyledIcon = styled.img`
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  position: absolute;
  top: -90px;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 24px;
`;
export const StyledDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ebf479;
  text-align: center;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 14px;
  gap: 4px;
`;
export const StyledCloseIcon = styled.div`
  position: absolute;
  right: 27px;
  top: 26px;
  color: #979abe;
  cursor: pointer;
  z-index: 10;
`;

export const StyledMoreHints = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 46px;
`;

export const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  justify-content: center;
  margin-top: 16px;
`;

export const StyledRecommendList = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 19px;
  flex-direction: nowrap;
  padding-left: 19px;
  transition: 0.3s;
`;

export const StyledRecommendListWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;
