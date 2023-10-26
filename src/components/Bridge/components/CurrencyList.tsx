import { memo } from 'react';
import styled from 'styled-components';

import type { Chain, Token } from '../types';
import CurrencyRow from './CurrencyRow';

const StyledCurrencyList = styled.div`
  padding: 0px 0px 20px;
  max-height: calc(80vh - 120px);
  overflow-x: auto;
  @media (max-width: 900px) {
    max-height: 50vh;
  }
`;

const CurrencyList = ({
  tokens = [],
  selectedCurrency,
  chains,
  onClick,
}: {
  tokens: Token[];
  selectedCurrency?: string;
  chains: { [key: number]: Chain };
  onClick: (currency: Token) => void;
}) => {
  return (
    <StyledCurrencyList>
      {tokens.map((token) => (
        <CurrencyRow
          key={token.address}
          currency={token}
          selectedCurrency={selectedCurrency}
          rpcUrl={chains[token.chainId].rpcUrls[0]}
          chainIcon={chains[token.chainId].icon}
          onClick={onClick}
        />
      ))}
    </StyledCurrencyList>
  );
};

export default memo(CurrencyList);
