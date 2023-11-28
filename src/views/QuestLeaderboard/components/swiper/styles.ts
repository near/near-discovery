import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  height: 320px;
  position: relative;
`;

export const StyledSwiperArrowButton = styled.div<{ $disabled: boolean }>`
  position: absolute;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #282d36;
  width: 36px;
  height: 44px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  top: calc(50% - 22px);

  ${({ $disabled }) =>
    $disabled
      ? `
        opacity: 0.4;
      `
      : `cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }`}
`;

export const StyledImages = styled.div`
  display: flex;
  flex-wrap: nowrap;
  transition: 0.3s;
  overflow: hidden;
`;

export const StyledImage = styled.img`
  border-radius: 32px;
  width: 100%;
  height: 320px;
`;

export const StyledImagesBox = styled.div`
  width: 100%;
  overflow: hidden;
`;
