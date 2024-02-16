import styled from 'styled-components';
export {
  StyledSvg,
  StyledFlex
} from '../../styles'
import { RotateKeyframes } from '../../styles'

export const StyledInputWithEmoji = styled.div`
  position: relative;
  em-emoji-picker {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .loading {
    transform-origin: center;
    animation: 0.5s linear infinite ${RotateKeyframes};
  }

`
export const StyledInputWrapper = styled.div`
  position: relative;
  width: 370px;
  padding: 2px;
`
export const StyledInputFilter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 0;
  background: linear-gradient(to right, rgb(0, 209, 255), rgb(192, 89, 255), rgb(255, 153, 0));
  border-radius: 10px;
  filter: blur(10px);
  opacity: 0;
  transition: opacity linear 0.3s;
`
export const StyledInputLinearGradient = styled.div`
  background: linear-gradient(to right, rgb(0, 209, 255), rgb(192, 89, 255), rgb(255, 153, 0));
  padding: 2px;
  border-radius: 12px;
  transition: all 0.5s ease 0s;
  position: relative;
  z-index: 2;
`
export const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #000;
  border-radius: 12px;
`

export const StyledInput = styled.input`
  outline: none;
  border: none;
  padding: 0 12px;
  flex: 1;
  height: 38px;
  background: transparent;
  color: #FBFBFB;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`
export const StyledInputSuffix = styled.div`
  color: #FFF;
  text-align: center;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`
export const StyledEmojiWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #373A53;
  background: rgba(55, 58, 83, 0.20);
`