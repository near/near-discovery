import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 310px;
  border-radius: 20px;
  background: linear-gradient(180deg, #373a53 0%, #16181d 100%);
  padding: 40px;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 30px;
`;

export const StyledContent = styled.div`
  position: relative;
  z-index: 10;
`;

export const StyledBg = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(/images/onboarding/top_bg.png);
  background-repeat: no-repeat;
  background-size: 100%;
  z-index: 1;
`;

export const StyledColorBg = styled.div`
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 2;
`;

export const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
`;

export const StyledChainLogoWrapper = styled.div`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledChainLogo = styled.img`
  width: 48px;
`;

export const StyledChainName = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 60px;
`;

export const StyledInputWrapper = styled.div`
  width: 829px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: rgba(0, 0, 0, 0.3);
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledInput = styled.input`
  color: #ebf479;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  height: 22px;
  flex-grow: 1;

  &:placeholder {
    color: #979abe;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    opacity: 0.3;
  }
`;

export const StyledButton = styled.button`
  width: 131px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  cursor: pointer;
  transition: 0.3s;
  color: #02051e;
  text-align: center;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:disabled {
    background: linear-gradient(180deg, #5f614d 0%, #3a3d11 100%);
  }

  &:not(disabled):hover {
    opacity: 0.9;
  }
  &:not(disabled):active {
    opacity: 0.8;
  }
`;
