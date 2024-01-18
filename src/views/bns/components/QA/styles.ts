import styled from 'styled-components'
export {
  StyledContainer, StyledFlex,
  StyledLoadingWrapper, StyledSvg, StyledText
} from '../../styles'
export const StyledHead = styled.div`
  margin-bottom: 26px;
  font-family: Gantari;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #FFF 0%, #AFAFAF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`


export const StyledQuestion = styled.div`
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #2E3142;
`
export const StyledQuestionName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 84px;
  background: #373A53;
`
export const StyledIconRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

`
export const StyledQuestionDesc = styled.div`
  padding: 26px 30px 29px;
`