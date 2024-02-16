import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1244px;
  margin: 140px auto 0px;
  overflow: hidden;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 165%; /* 59.4px */
  text-transform: capitalize;
  padding-bottom: 4px;
`;

export const StyledContent = styled.div`
  height: 206px;
  width: 100%;
  display: flex;
  overflow: hidden;
`;

export const StyledList = styled.div<{ length: number; current: number }>`
  display: flex;
  width: ${({ length }) => length * 540}px;
  transition: 0.5s;
  transform: translateX(-${({ current }) => current * 540}px);
  will-change: transform;
  gap: 18px;
`;

export const StyledItem = styled.div`
  width: 540px;
  height: 206px;
  flex-shrink: 0;
  border-radius: 20px;
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(5px);
  padding: 26px 15px 26px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledItemImg = styled.img`
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 16px;
`;

export const StyledItemTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledItemDesc = styled.div`
  color: #d2d2d2;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 14px;
`;

export const StyledItemRead = styled.div`
  color: #d2d2d2;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  margin-top: 15px;
  cursor: pointer;
`;

export const StyledIcons = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 30px;
`;

export const StyledIcon = styled.div`
  border: 1px solid rgba(55, 58, 83, 1);
  width: 55px;
  height: 30px;
  line-height: 26px;
  text-align: center;
  border-radius: 16px;
  margin-right: 14px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:not-disabled:hover {
    background: #272a38;
  }
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
