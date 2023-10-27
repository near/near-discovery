import { memo } from 'react';
import styled from 'styled-components';
import useChain from '@/hooks/useChain';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { usePriceStore } from '@/stores/price';
import { balanceFormated, valueFormated } from '@/utils/balance';

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
  const { balance } = useTokenBalance({ isNative: true });
  const price = usePriceStore((store) => store.price);
  return (
    <StyledWrapper mt={mt}>
      <StyledAmount>
        {currentChain ? `${balanceFormated(balance, 4)} ${currentChain.nativeCurrency.symbol}` : '--'}
      </StyledAmount>
      <StyledValue>
        ${valueFormated(balance, currentChain ? price[currentChain.nativeCurrency.symbol] : '')} USD
      </StyledValue>
    </StyledWrapper>
  );
};

export default memo(Amount);
