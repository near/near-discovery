import { memo } from 'react';
import styled from 'styled-components';

import type { SelectClick, Token } from '../types';
import SelectItem from './SelectItem';
import SelectLabel from './SelectLabel';

const Container = styled.div`
  width: 50%;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 12px 0px 0px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid #373a53;
  padding-right: 10px;
  gap: 6px;

  &.disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

const SelectTokens = ({ token, disabled, onClick }: { token?: Token; disabled?: boolean; onClick: SelectClick }) => {
  return (
    <Container
      className={disabled ? 'disabled' : ''}
      onClick={() => {
        !disabled && onClick('token', token);
      }}
    >
      <SelectLabel label="Token" />
      <SelectItem item={token} />
    </Container>
  );
};

export default memo(SelectTokens);
