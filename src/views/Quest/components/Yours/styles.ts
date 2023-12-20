import styled from 'styled-components';

export { StyledCoin } from '../../styles';

export const StyledContainer = styled.div`
  border-radius: 33px;
  background: radial-gradient(72.14% 104.62% at 47.64% 100%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 100%),
    radial-gradient(185.62% 109.56% at 0% 71.21%, #ff38a1 0%, #7138cd 55.21%, #4400b2 100%);
  box-shadow: 0px 0px 50px 0px rgba(255, 255, 255, 0.15) inset;
  width: 235px;
  height: 66px;
  flex-shrink: 0;
  display: flex;
  box-sizing: border-box;
  padding: 12px 23px 12px 23px;
  align-items: center;
  gap: 20px;
  justify-content: center;
  position: fixed;
  right: 30px;
  bottom: 58px;
  z-index: 30;
  cursor: pointer;
`;

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const StyledLabel = styled.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
`;

export const StyledValue = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledLine = styled.div`
  width: 1px;
  height: 42px;
  background-color: rgba(255, 255, 255, 0.2);
`;
