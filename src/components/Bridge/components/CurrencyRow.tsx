import { memo } from 'react';
import styled from 'styled-components';

import CurrencyIcon from '@/components/CurrencyIcon';
import Loading from '@/components/Icons/Loading';
import useTokenBalance from '../hooks/useTokenBalance';
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
  text-overflow: ellipsis;
  overflow: hidden;
  width: 80%;
  word-break: break-all;
`;
const CurrencyAmount = styled.div`
  font-size: 18px;
  font-weight: 500px;
`;

const CurrencyRow = ({
  currency,
  selectedCurrency,
  updater,
  chainIcon,
  loading,
  balance,
  onClick,
}: {
  currency: Token;
  selectedCurrency?: string;
  rpcUrl?: string;
  updater?: number;
  chainIcon?: string;
  loading: boolean,
  balance: string,
  onClick: (chain: Token) => void;
}) => {
  
  // const { loading, balance } = useTokenBalance({ tokensByChain: currency });
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
      <CurrencyAmount key={chainIcon}>{loading ? <Loading /> : balanceFormated(balance, 4)}</CurrencyAmount>
    </StyledCurrencyRow>
  );
};

export default memo(CurrencyRow);
