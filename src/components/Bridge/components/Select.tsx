import { memo } from 'react';
import styled from 'styled-components';
import SelectTokens from './SelectTokens';
import SelectChains from './SelectChains';
import type { Token, Chain, SelectClick } from '../types';

const Container = styled.div`
  width: 100%;
  height: 78px;
  border-radius: 12px;
  display: flex;
  width: 100%;
  gap: 10px;
  border: 1px solid #373a53;
  background-color: rgba(11, 12, 19, 0.5);
  padding: 10px 20px;
  box-sizing: border-box;
`;

const Select = ({
  token,
  chain,
  tokenDisabled,
  chainDisabled,
  onClick,
}: {
  token?: Token;
  chain?: Chain;
  tokenDisabled?: boolean;
  chainDisabled?: boolean;
  onClick: SelectClick;
}) => {
  return (
    <Container>
      <SelectTokens token={token} disabled={tokenDisabled} onClick={onClick} />
      <SelectChains chain={chain} disabled={chainDisabled} onClick={onClick} />
    </Container>
  );
};

export default memo(Select);
