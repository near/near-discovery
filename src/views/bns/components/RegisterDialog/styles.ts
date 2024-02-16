import styled from 'styled-components'
import { RotateKeyframes } from '../../styles'
export {
  StyledButton, StyledDialog, StyledFlex, StyledSvg, StyledText
} from '../../styles'

export const StyledDialogContainer = styled.div`
  width: 412px;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`
export const StyledDialogHead = styled.div`
  padding: 21px 26px 18px;
  display: flex;
  justify-content: flex-end;
`
export const StyledDialogBody = styled.div`
  padding: 0 26px 26px;
`
export const StyledInputNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 40px;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: rgba(33, 35, 48, 0.5);
`

export const StyledInputNumberButton = styled.button`
  outline: none;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #32364B;
  color: #FFF;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &[disabled] {
    opacity: 0.5;
  }
`
export const StyledLoadingButton = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    content: "";
    position: absolute;
    border-radius: 12px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%);
    opacity: 0.3;
  }
  .circle {
    animation: 0.5s linear  infinite ${RotateKeyframes};
  }
`

export const StyledUserNameButtonWrapper = styled.div`
  position: relative;
  height: 62px;
  padding: 0 44px;
  border-top: 1px solid rgba(151, 154, 190, 0.2);
  border-bottom: 1px solid rgba(151, 154, 190, 0.2);
  &:before, &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 96px;
    opacity: 0.2;
    background: #979ABE;
  }
  &:before {
    left: 44px;
    top: -17px;
  }
  &:after {
    right: 44px;
    top: -17px;
  }
`

export const StyledUserNameButton = styled.div`
  position: relative;
  border-radius: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before, &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  &:before {
    border-radius: 30px;
    background: linear-gradient(90deg, #06D0FF 0%, #C55EEC 50%, #FF9802 100%);
    filter: blur(11.800000190734863px);
  }
  &:after {
    border-radius: 30px;
    border: 4px solid #7AA1FF;
    background: #040707;
  }
`

export const StyledUserName = styled.div`
  position: relative;
  z-index: 50;
  color: #FBFBFB;
  font-family: Gantari;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`