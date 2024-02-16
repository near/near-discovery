import { memo, useState } from 'react';
import styled from 'styled-components';
import Loading from '@/components/Icons/Loading';
import usePasswordAction from '../../hooks/usePasswordAction';
import { StyledExpandButton } from './styles';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid #33364b;
  background: #1b1e27;
  height: 36px;
  padding: 7px 12px;
  box-sizing: border-box;
  flex-grow: 1;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: rgba(151, 154, 190, 0.5);
  }
`;

const PasswordAction = ({ onSuccess, id }: any) => {
  const [password, setPassword] = useState('');
  const { loading, handleConfirm } = usePasswordAction(onSuccess);
  return (
    <StyledContainer>
      <StyledInput
        placeholder="secret phrase"
        value={password}
        onChange={(ev) => {
          setPassword(ev.target.value);
        }}
      />
      <StyledExpandButton
        disabled={!password}
        onClick={() => {
          if (password) handleConfirm(id, password);
        }}
      >
        {loading ? <Loading size={16} /> : 'Confirm'}
      </StyledExpandButton>
    </StyledContainer>
  );
};

export default memo(PasswordAction);
