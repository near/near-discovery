import styled from 'styled-components'


export {
  StyledButton, StyledDialog, StyledFlex, StyledSvg, StyledText, StyledWrapper
} from '../../styles'

export const StyledDialogContainer = styled.div`
  /* width: 412px; */
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`
export const StyledDialogHead = styled.div`
  padding: 23px 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const StyledDialogBody = styled.div`
  padding: 0 20px 20px;
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
`
export const StyledAddressInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.30);
  padding-right: 12px;
`
export const StyledAddressInput = styled.input`
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 16px 12px;
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`

// export const StyledCoin = styled.div`
//   position: relative;
//   display: flex;
//   width: 116px;
//   height: 120px;
//   flex-shrink: 0;
//   border-radius: 10px;
//   border: 1px solid #373A53;
//   background: #2E3142;
// `
export const StyledCheckedStatus = styled.div`
  position: absolute;
  right: 6px;
  top: 6px;
  color: #979ABE;
  text-align: center;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const StyledPlusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #373A53;
  background: #2E3142;
  .gray {
    display: flex;
  }
  .white {
    display: none;
  }
  &:hover {
    background: #333649;
    .gray {
      display: none;
    }
    .white {
      display: flex;
    }
  }
`