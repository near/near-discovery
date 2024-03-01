import { useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 235px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #3d405a;
  background: #171717;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 8px 14px;
  width: 187px;
  box-sizing: border-box;
  color: #fff;
`;

const StyledButton = styled.button`
  border-radius: 6px;
  border: 1px solid #3d405a;
  background: #33c5f4;
  width: 46px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  &:not(:disabled):hover {
    opacity: 0.9;
  }
  &:not(:disabled):active {
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

export default function CardInput({ onConfirm }: any) {
  const [val, setVal] = useState();
  return (
    <StyledContainer>
      <StyledInput
        onChange={(ev: any) => {
          setVal(ev.target.value);
        }}
      />
      <StyledButton
        disabled={!val}
        onClick={(ev) => {
          ev.stopPropagation();
          onConfirm(val);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
          <path
            d="M2 11.7297H16C16.5523 11.7297 17 11.282 17 10.7297V3C17 2.44772 16.5523 2 16 2H10M2 11.7297L6.5 7.22973M2 11.7297L6.5 16.2297"
            stroke="black"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </StyledButton>
    </StyledContainer>
  );
}
