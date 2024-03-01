import styled from 'styled-components';

export const StyledContainer = styled.div<{ $disabled: boolean }>`
  width: 380px;
  height: 168px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #000;
  background-image: url(/images/odyssey/v2/card_bg.png);
  background-repeat: no-repeat;
  background-position: left bottom;
  transition: 0.3s;

  position: relative;
  overflow: hidden;

  ${({ $disabled }) =>
    !$disabled
      ? `
    &:hover {
      border-color: #33c5f4;
    }
    &:hover .card_active_bg {
      opacity: 0.5;
    }
    cursor: pointer;
    `
      : `
    cursor: default; 
    `}
`;

export const StyledBg = styled.div`
  border-radius: 268.784px;
  opacity: 0.5;
  background: radial-gradient(50% 50% at 50% 50%, #0075ff 0%, rgba(0, 209, 255, 0) 100%);
  filter: blur(50px);
  width: 268.784px;
  height: 268.784px;
  flex-shrink: 0;
  position: absolute;
  z-index: 1;
  top: -60%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: 0.3s;
`;

export const StyledContent = styled.div`
  position: relative;
  z-index: 5;
  padding: 20px 16px 16px 20px;
`;
