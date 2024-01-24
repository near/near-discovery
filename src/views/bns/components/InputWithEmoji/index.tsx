import { memo, useEffect, useRef, useState } from 'react';
import emojiRegex from 'emoji-regex'
import {
  StyledEmojiWrapper,
  StyledFlex,
  StyledInput,
  StyledInputContainer,
  StyledInputFilter,
  StyledInputLinearGradient,
  StyledInputSuffix,
  StyledInputWithEmoji,
  StyledInputWrapper,
  StyledSvg
} from './styles';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import _ from 'lodash';
const iconSearch = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
    <path d="M10 9.00049C10.6279 8.16474 11 7.12582 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11C7.6356 11 9.08777 10.2147 10 9.00049ZM10 9.00049L13 12.0005" stroke="white" stroke-width="2" stroke-linecap="round" />
  </svg>
)
const iconCircle = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
    <path d="M13.9845 11.9838C11.2234 14.7449 6.74681 14.7449 3.98572 11.9838C1.22463 9.22268 1.22463 4.74607 3.98572 1.98498" stroke="#04D1FF" stroke-width="2" stroke-linecap="round" />
  </svg>
)
const iconClose = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z" fill="#979ABE" />
  </svg>
)
const InputWithEmoji = ({ onChange, queryStatus }: { onChange: any, queryStatus: number, value: string, setValue: any }) => {
  const [value, setValue] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const handleInputChange = function (event: any) {
    const value = event.target.value
    const array = _.split(value, '')
    const txtReg = /[0-9a-zA-Z]/
    const emojiReg = emojiRegex()
    const filterArray = array.filter(txt => txtReg.test(txt) || emojiReg.test(txt))
    setValue(filterArray.join(''))
  }
  const handleClickEmoji = function () {
    setShowPicker(prev => !prev)
  }
  const handleEmojiSelect = function (event: any) {
    setValue(prev => prev += event.native)
  }
  const handleChange = () => {
    onChange && onChange(value)
  }
  useEffect(() => {
    handleChange()
  }, [value])
  return (
    <StyledInputWithEmoji>
      <StyledFlex $gap='20px'>
        <StyledInputWrapper>
          <StyledInputLinearGradient>
            <StyledInputContainer>
              <StyledSvg style={{ marginLeft: 15 }} className={queryStatus === 1 ? 'loading' : ''}>{queryStatus === 1 ? iconCircle : iconSearch}</StyledSvg>
              <StyledInput placeholder='yourname' value={value} onChange={(event) => handleInputChange(event)} onBlur={() => setIsFocus(false)} onFocus={() => setIsFocus(true)} />
              <StyledInputSuffix style={{ marginRight: 12 }}>.base</StyledInputSuffix>
            </StyledInputContainer>
          </StyledInputLinearGradient>
          <StyledInputFilter style={{ opacity: isFocus ? 1 : 0 }} />
        </StyledInputWrapper>
        <StyledEmojiWrapper onClick={() => handleClickEmoji()}>{showPicker ? iconClose : '😍'}</StyledEmojiWrapper>
      </StyledFlex>
      {showPicker && <Picker data={data} dynamicWidth theme='dark' onEmojiSelect={handleEmojiSelect} />}
    </StyledInputWithEmoji >
  );
};

export default memo(InputWithEmoji);
