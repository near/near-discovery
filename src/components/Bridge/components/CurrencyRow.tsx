import { memo } from 'react';
import styled from 'styled-components';
import { balanceFormated } from '@/utils/balance';
import { Token } from '../types';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import Loading from '@/components/Icons/Loading';

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
const CurrencyIconWrapper = styled.div`
  position: relative;
`;
const CurrencyIcon = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 20px;
`;
const ChainIcon = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  right: 10px;
  bottom: -3px;
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
        <CurrencyIconWrapper>
          <CurrencyIcon src={currency.icon} />
          {chainIcon && <ChainIcon src={chainIcon} />}
        </CurrencyIconWrapper>

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
