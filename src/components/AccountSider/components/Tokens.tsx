import { memo } from 'react';
import styled from 'styled-components';

import CurrencyIcon from '@/components/CurrencyIcon';
import Loading from '@/components/Icons/Loading';
import useChain from '@/hooks/useChain';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { usePriceStore } from '@/stores/price';
import { Token } from '@/types';
import { balanceFormated, valueFormated } from '@/utils/balance';

import useTokens from '../hooks/useTokens';

const StyledContainer = styled.div<{ mt?: number }>`
  margin-top: ${({ mt }) => mt + 'px'};
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
  padding-top: 10px;
`;
const TokenWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
`;
const StyledToken = styled.div`
  display: flex;
`;
const TokenSymbol = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
const Symbol = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
const GasTag = styled.div`
  font-size: 12px;
  font-style: italic;
  font-weight: 300;
  color: #979abe;
`;
const Price = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #979abe;
`;
const Balance = styled.div`
  text-align: right;
  color: #fff;
`;

const Token = ({ token }: { token: Token }) => {
  const chain = useChain(token.chainId);
  const price = usePriceStore((store) => store.price);
  const { balance, loading } = useTokenBalance({ currency: token });
  return (
    <TokenWrapper>
      <StyledToken>
        <CurrencyIcon token={token.icon} chain={chain?.icon} />
        <div>
          <TokenSymbol>
            <Symbol>{token.symbol}</Symbol>
            {token.isNative && <GasTag>Gas token</GasTag>}
          </TokenSymbol>
          <Price>${valueFormated('1', price[token.symbol]) || '-'}</Price>
        </div>
      </StyledToken>
      <Balance>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Symbol>{balanceFormated(balance)}</Symbol>
            <Price>${valueFormated(balance, price[token.symbol])}</Price>
          </>
        )}
      </Balance>
    </TokenWrapper>
  );
};

const Tokens = ({ mt }: { mt?: number }) => {
  const tokens = useTokens();
  return (
    <StyledContainer mt={mt}>
      {tokens?.map((_token, i) => (
        <Token key={_token.address || 'native'} token={_token} />
      ))}
    </StyledContainer>
  );
};

export default memo(Tokens);
