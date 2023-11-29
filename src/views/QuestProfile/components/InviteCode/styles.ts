import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: absolute;
  width: 148px;
  height: 52px;
  cursor: pointer;
  right: 0px;
  top: 6px;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const StyledValue = styled.div`
  color: #1e2028;
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  right: 14px;
  top: 15px;
  z-index: 10;
  .num {
    font-weight: 700;
  }
`;
