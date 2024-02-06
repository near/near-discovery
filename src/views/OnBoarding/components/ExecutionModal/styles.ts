import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledContent = styled.div`
  padding: 20px 20px 0px;
`;

export const StyledPanel = styled.div`
  border-radius: 12px;
  background: #1b1e27;
  padding: 12px;
`;

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  .label {
    color: #979abe;
  }
`;

export const StyledLabel = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const StyledValue = styled.div`
  color: #fff;
  text-align: right;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  .balance {
    text-decoration-line: underline;
    cursor: pointer;
  }
`;

export const StyledSelect = styled.div`
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  height: 34px;
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 18px;
  cursor: pointer;
  position: relative;
`;

export const StyledDapp = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const StyledDappIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 6px;
`;

export const StyledDappName = styled.div`
  color: #fff;
  text-align: right;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const StyledSelectPanel = styled(motion.div)`
  width: 204px;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #303142;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 12px 0px;
  position: absolute;
  left: -10px;
  top: 40px;
  z-index: 501;
`;

export const StyledSelectPanelItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  height: 38px;
  box-sizing: border-box;

  &:hover {
    background-color: #181a27;
  }
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  box-sizing: border-box;
`;

export const StyledInput = styled.input`
  color: #fff;
  text-align: right;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  height: 26px;
  padding: 6px;
  border-bottom: 1px solid #373a53;
`;

export const StyledButtonWrapper = styled.div`
  --button-color: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  --button-text-color: #02051e;
  --switch-color: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  button {
    height: 48px;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 500;
`;
export const StyledButtonList = styled.div`
  /* width: 500px; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`
export const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 1.5s linear  infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
export const StyledButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  float: right;
  margin-bottom: 20px;

  &:disabled {
    background: linear-gradient(180deg, #5f614d 0%, #3a3d11 100%);
  }
  &:not(disabled):hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;
