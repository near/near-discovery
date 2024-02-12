import { memo } from 'react';
import styled from 'styled-components';

import type { Chain, SelectClick } from '../types';
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
  padding-left: 10px;
  gap: 6px;

  &.disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

const SelectChains = ({ chain, disabled, onClick }: { chain?: Chain; disabled?: boolean; onClick: SelectClick }) => {
  return (
    <Container
      className={disabled ? 'disabled' : ''}
      onClick={() => {
        !disabled && onClick('chain', chain);
      }}
    >
      <SelectLabel label="Network" />
      <SelectItem key={chain?.chainId} item={chain ? { icon: chain.icon, symbol: chain.chainName } : undefined} />
    </Container>
  );
};

export default SelectChains;
