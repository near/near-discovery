import { memo } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useChain from '@/hooks/useChain';
import { usePriceStore } from '@/stores/price';
import { balanceFormated, valueFormated } from '@/utils/balance';
import useBakTokenBalance from '@/hooks/useCurrencyBalance';
import { excludeChain } from '@/components/Bridge/config/chain'
import useTokenBalance from '@/components/Bridge/hooks/useTokenBalance';

import useTokens from '../hooks/useTokens';

import type { Token } from '@/types';

const StyledWrapper = styled.div<{ mt?: number }>`
  text-align: center;
  color: #fff;
  margin-top: ${({ mt }) => mt + 'px'};
`;
const StyledAmount = styled.div`
  font-size: 32px;
  font-weight: 700;
`;
const StyledValue = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const Amount = ({ mt }: { mt?: number }) => {
  const currentChain = useChain();
  const tokens = useTokens();
  const currentToken = tokens?.filter(token => token.isNative)[0] as Token

  let { balance, loading } = useTokenBalance({ tokensByChain: currentToken });
  const { balance : balanceBak } = useBakTokenBalance({ isNative: true })
  const price = usePriceStore((store) => store.price);
  if (currentChain && excludeChain(currentChain.chainId)) {
    balance = balanceBak as string
  }

  return (
    <StyledWrapper mt={mt}>
      <StyledAmount>
        {
          loading ? <Loading /> : currentChain ? `${balanceFormated(balance, 4)} ${currentToken.symbol || currentChain.nativeCurrency.symbol}` : '--'
        }
      </StyledAmount>
      <StyledValue>
        ${valueFormated(balance, currentChain ? price[currentChain.nativeCurrency.symbol] : '')} USD
      </StyledValue>
    </StyledWrapper>
  );
};

export default memo(Amount);
