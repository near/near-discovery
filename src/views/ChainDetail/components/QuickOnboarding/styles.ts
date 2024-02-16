import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-top: 80px;
  width: 1244px;
  margin: 0 auto;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledSubtitle = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 161.2%; /* 25.792px */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledList = styled.div`
  display: flex;
  align-items: center;
  gap: 12px 12px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

export const StyledItem = styled.div<{ $disbaled: boolean }>`
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(10px);
  width: 300px;
  height: 140px;
  flex-shrink: 0;
  position: relative;
  ${({ $disbaled }) => ($disbaled ? '' : '&:hover{cursor: pointer;}')}
`;

export const StyledItemBg = styled.div`
  background-image: url(/images/onboarding/card_bg.png);
  background-repeat: no-repeat;
  z-index: 1;
  opacity: 0.1;
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 160px;
  height: 160px;
`;

export const StyledItemContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledItemTitle = styled.div<{ $disbaled: boolean }>`
  font-family: Gantari;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  padding-bottom: 14px;
  color: ${({ $disbaled }) => ($disbaled ? '#979abe' : '#fff')};
`;

export const StyledItemColorBg = styled.div`
  position: absolute;
  left: 10px;
  top: 0px;
  z-index: 2;
  width: 223px;
  height: 72px;
`;

export const StyledItemComing = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
`;
