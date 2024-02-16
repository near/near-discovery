import { memo } from 'react';
import styled from 'styled-components';

import Checkbox from '@/components/Checkbox';

const Container = styled.div`
  margin-top: 10px;
`;
const Header = styled.div`
  display: flex;
  gap: 10px;
`;
const Label = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #979abe;
`;
const InputWrapper = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 12px;
  border: 1px solid #373a53;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 6px;
`;
const Input = styled.input`
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  background-color: transparent;
  flex-grow: 1;
  &::placeholder {
    color: #979ABE;
    font-size: 14px;
    font-weight: 400;
  }
`;

const Paste = styled.div`
  width: 39px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #979ABE;
  background: rgba(151, 154, 190, 0.30);
  color: #979ABE;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
`

const Destination = ({
  checked,
  setChecked,
  disabled,
  destination,
  setDestination,
}: {
  checked: boolean;
  disabled?: boolean;
  setChecked: (checked: boolean) => void;
  destination?: string;
  setDestination: (destination: string) => void;
}) => {
  return (
    <Container>
      <Header>
        <Checkbox
          checked={checked}
          onClick={() => {
            !disabled && setChecked(!checked);
            if (!checked) {
              setDestination('');
            }
          }}
          disabled={disabled}
        />
        <Label>{"I'm transferring to another address"}</Label>
      </Header>
      {checked && (
        <InputWrapper>
          <Input
            value={destination}
            placeholder='Destination Address'
            onChange={(ev) => {
              setDestination(ev.target.value);
            }}
          />
          <Paste onClick={async () => {
            const val = await navigator.clipboard.readText()
            if (val) {
              setDestination(val)
            }
          }}>Paste</Paste>
        </InputWrapper>
      )}
    </Container>
  );
};

export default memo(Destination);
