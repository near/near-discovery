import { memo, useEffect } from 'react';
import styled from 'styled-components';

import type { Chain, Token } from '../types';
import CurrencyRow from './CurrencyRow';
import { useTokensBalance } from '../hooks/useTokenBalance'
import type { balance } from '../hooks/useTokenBalance'

const StyledCurrencyList = styled.div`
  padding: 0px 0px 20px;
  max-height: calc(80vh - 120px);
  overflow-x: auto;
  @media (max-width: 900px) {
    max-height: 50vh;
  }
`;

function filterBalance (balances: balance[], symbol: string): string {
  for (const balance of balances) {
    if (balance.symbol === symbol) {
      return balance.amount
    }
  }
  return '0'
}

const CurrencyList = ({
  tokens = [],
  selectedCurrency,
  chains,
  balances,
  loading,
  onClick,
}: {
  tokens: Token[];
  selectedCurrency?: string;
  chains: { [key: number]: Chain };
  balances: balance[],
  loading: boolean,
  onClick: (currency: Token) => void;
}) => {
  return (
    <StyledCurrencyList>
      {tokens.map((token) => (
        <CurrencyRow
          key={token.address}
          currency={token}
          loading={loading}
          balance={filterBalance(balances, token.symbol)}
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
