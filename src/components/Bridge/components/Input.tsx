import { memo } from 'react';
import styled from 'styled-components';
import { balanceFormated } from '@/utils/balance';
import Loading from '@/components/Icons/Loading';
import { Token } from '../types';

const Container = styled.div`
  margin-top: 10px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #979abe;
`;
const Balance = styled.div`
  font-size: 12px;
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
`;
const StyledInput = styled.input`
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  background-color: transparent;
  flex-grow: 1;
`;
const MaxButton = styled.button`
  width: 36px;
  height: 22px;
  border: 1px solid #979abe;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  color: #979abe;
  background-color: rgba(151, 154, 190, 0.5);
`;

const Input = ({
  balance,
  loading,
  amount,
  onChange,
}: {
  balance?: string;
  loading?: boolean;
  amount?: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Container>
      <Header>
        <Label>Total Amount</Label>
        <Balance>Balance: {loading ? <Loading size={8} /> : balanceFormated(balance, 2)}</Balance>
      </Header>
      <InputWrapper>
        <StyledInput
          value={amount}
          onInput={(ev: React.ChangeEvent<HTMLInputElement>) => {
            if (isNaN(Number(ev.target.value))) return;
            onChange(ev.target.value);
          }}
        />
        <MaxButton
          onClick={() => {
            if (balance) onChange(balance);
          }}
          disabled={!balance}
        >
          Max
        </MaxButton>
      </InputWrapper>
    </Container>
  );
};

export default memo(Input);
