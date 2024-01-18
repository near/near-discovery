import styled from 'styled-components'
export {
  StyledContainer, StyledFlex,
  StyledLoadingWrapper, StyledSvg, StyledText, StyledImage,
} from '../../styles'
export const StyledHead = styled.div`
  margin-bottom: 22px;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #FFF 0%, #AFAFAF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const StyledBnsNames = styled.div`
  margin-top: 61px;
  width: 1245px;
  margin: 61px auto 0;
  /* height: 243px; */
  padding: 24px 20px 19px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #282A3E;
  background: #1A1C22;
`

export const StyledBnsName = styled.div`
  position: relative;
  width: 240px;
  height: 158px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #262836;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
`
export const StyledPrimary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 12px;
  top: 12px;
  width: 55px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.30);
  color: #979ABE;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`