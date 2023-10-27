import { memo } from 'react';
import styled from 'styled-components';

import CurrencyIcon from '@/components/CurrencyIcon';
import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { balanceFormated } from '@/utils/balance';

import type { Token } from '../types';

const StyledCurrencyRow = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 10px 0px;
  color: #fff;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.active {
    background-color: #ebf479;
    pointer-events: none;
    color: #000;
  }
`;
const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const CurrencySymbol = styled.div`
  font-size: 18px;
  font-weight: 500px;
`;
const CurrencyName = styled.div`
  font-size: 14px;
`;
const CurrencyAmount = styled.div`
  font-size: 18px;
  font-weight: 500px;
`;

const CurrencyRow = ({
  currency,
  selectedCurrency,
  rpcUrl,
  updater,
  chainIcon,
  onClick,
}: {
  currency: Token;
  selectedCurrency?: string;
  rpcUrl?: string;
  updater?: number;
  chainIcon?: string;
  onClick: (chain: Token) => void;
}) => {
  const { loading, balance } = useTokenBalance({ currency, rpcUrl, updater });
  return (
    <StyledCurrencyRow
      className={currency.address === selectedCurrency ? 'active' : ''}
      onClick={() => {
        onClick(currency);
      }}
    >
      <CurrencyLabel>
        <CurrencyIcon token={currency.icon} chain={chainIcon} />
        <div>
          <CurrencySymbol>{currency.symbol}</CurrencySymbol>
          <CurrencyName>{currency.name}</CurrencyName>
        </div>
      </CurrencyLabel>
      <CurrencyAmount>{loading ? <Loading /> : balanceFormated(balance, 4)}</CurrencyAmount>
    </StyledCurrencyRow>
  );
};

export default memo(CurrencyRow);
