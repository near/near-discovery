import styled, { keyframes } from 'styled-components';
import type { StyledFlexType, StyledButtonType } from './types';
// login
export const StyledLogin = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 82px;
`
export const StyledLoginConnectWalletButton = styled.button`
  margin-bottom: 20px;
  outline: none;
  border: none;
  width: 300px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #EBF479;
  color: #000;
  text-align: center;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
export const StyledInvitedUsers = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
// guide
export const StyledGuidStep = styled.div`
  /* width: 529px; */
  width: 100%;
  height: 95px;
  flex-shrink: 0;
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: rgba(55, 58, 83, 0.50);
  &.active {
    border-color: #EBF479;
  }
`
export const StyledGuideStepLine = styled.div`
  flex: 1;
  height: 4px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.15);
  &.active {
    background: #EBF479;
  }
`
export const StyledGuideContinueButton = styled.button`
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 48px;
  border-radius: 10px;
  background: #EBF479;
  color: #000;
  text-align: center;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
export const StyledGuideSkipButton = styled.button`
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  width: 153px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #979ABE;
  color: #979ABE;
  text-align: center;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
// invite
export const StyledCodeInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  &:before, 
  &:after {
    content: "";
    position: absolute;
  }
  &:before {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    background: linear-gradient(180deg, #E2E2E2 0%, #5B5B5B 100%);
  }
  &:after {
    left: 4px;
    top: 4px;
    right: 4px;
    bottom: 4px;
    border-radius: 10px;
    background: linear-gradient(180deg, #9A9A9A 0%, #F4F4F4 100%);
  }
`
export const StyledCodeInput = styled.input`
  position: relative;
  z-index: 50;
  outline: none;
  border: none;
  background: transparent;
  width: 16px;
  border-bottom: 2px solid #000;
  text-align: center;
  color: #000;
  text-align: center;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

export const StyledErrorTips = styled.div`
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 422px;
  height: 54px;
  border-radius: 16px;
  border: 1px solid #FF83C6;
  background: rgba(55, 58, 83, 0.50);
  color: #FF83C6;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
// campaign
export const StyledAchieved = styled.div`
  position: absolute;
  right: -23px;
  bottom: -20px;
`
export const StyledUserName = styled.div`
  font-family: Gantari;
  font-size: 52px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #FFF 0%, #AFAFAF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
// common
export const RotateKeyframes = keyframes`
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
`
export const StyledDialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.60);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`
export const StyledWrapper = styled.div`
`

export const StyledWidthFull = styled.div`
  width: 100%;
`


export const StyledContainer = styled.div`
  width: 1244px;
  max-width: 100%;
  margin: 0 auto;
  padding-bottom: 100px;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`;

export const StyledLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 222px;
`

export const StyledImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const StyledSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledFlex = styled.div.attrs<StyledFlexType>(props => ({
  $direction: props.$direction || 'row',
  $wrap: props.$wrap || 'wrap',
  $align: props.$align || 'center',
  $justify: props.$justify || 'center',
  $gap: props.$gap || '0px'
}))`
  display: flex;
  flex-wrap: ${props => props.$wrap};
  flex-direction: ${props => props.$direction};
  align-items: ${props => props.$align};
  justify-content: ${props => props.$justify};
  gap: ${props => props.$gap};
`
export const StyledButton = styled.button.attrs<StyledButtonType>(props => ({
  $width: props.$width || '100%',
  $height: props.$height || '50px',
  $background: props.$background || '#373A53',
  $borderRadius: props.$borderRadius || '10px',
  $borderWidth: props.$borderWidth || '1px',
  $borderStyle: props.$borderStyle || 'solid',
  $borderColor: props.$borderColor || '#373A53'
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.$width};
  height: ${props => props.$height};
  background: ${props => props.$background};
  border-radius: ${props => props.$borderRadius};
  border-width: ${props => props.$borderWidth};
  border-style: ${props => props.$borderStyle};
  border-color: ${props => props.$borderColor};
  cursor: pointer;
  &[disabled] {
    cursor: no-drop;
    opacity: 0.5;
  }
`

export const StyledText = styled.div<{
  $color?: string;
  $size?: string;
  $weight?: string;
  $line?: string;
  $justify?: string;
  $textAlign?: string;
}>`
  color: ${props => props.$color || '#FFF'};
  font-family: Gantari;
  font-size: ${props => props.$size || '36px'};
  font-style: normal;
  font-weight: ${props => props.$weight || '400'};
  line-height: ${props => props.$line || 'normal'};
  text-align: ${props => props.$line || 'left'};
  &.center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
