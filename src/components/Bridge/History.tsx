import { memo, useMemo } from 'react';
import styled from 'styled-components';

import { usePriceStore } from '@/stores/price';
import { balanceFormated, valueFormated } from '@/utils/balance';
import { formateTxDate } from '@/utils/date';

import CurrencyIcon from '../CurrencyIcon';
import Loading from '../Icons/Loading';

const StyledContainer = styled.div``;
const StyledHistory = styled.div`
  border-bottom: 1px solid #343838;
  padding-bottom: 10px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TokenWrapper = styled.div`
  display: flex;
`;
const Token = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const TokenSymbol = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;
const TokenValue = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #7c7f96;
`;
const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 14px;
  font-weight: 400;
  color: #979abe;
`;
const StyledDesc = styled.div<{ mt?: number }>`
  font-size: 14px;
  font-weight: 400;
  color: #7c7f96;
  margin-top: ${({ mt }) => mt}px;
`;
const WhiteColor = styled.span`
  color: #fff;
`;
const StyledTx = styled.a`
  font-size: 14px;
  font-weight: 400;
  text-decoration: underline;
  color: #64b5ff;
  cursor: pointer;
`;
const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
`;
const Empty = styled.div`
  text-align: center;
  padding-top: 60px;
`;

const History = ({ tx }: { tx: any }) => {
  const priceStore = usePriceStore((store) => store.price);
  return (
    <StyledHistory>
      <Header>
        <TokenWrapper>
          <CurrencyIcon token={'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628'} />
          <Token>
            <TokenSymbol>
              {balanceFormated(tx.amount)} {tx.symbol}
            </TokenSymbol>
            <TokenValue>${valueFormated(tx.amount, priceStore[tx.symbol])}</TokenValue>
          </Token>
        </TokenWrapper>
        <StatusWrapper>
          <div>{tx.status === 'success' ? 'Success' : 'Processing'}</div>
          {tx.duration && <div>~ {tx.duration}</div>}
        </StatusWrapper>
      </Header>
      <StyledDesc mt={10}>
        From <WhiteColor>{tx.inputChain}</WhiteColor> to <WhiteColor>{tx.outputChain}</WhiteColor>
      </StyledDesc>
      <StyledDesc mt={6}>
        {formateTxDate(tx.time)}{' '}
        <StyledTx href={tx.scan + '/tx/' + tx.tx} target="_blank">
          Tx
        </StyledTx>
      </StyledDesc>
    </StyledHistory>
  );
};

const Historys = ({ txs, loading }: { txs: any; loading?: boolean }) => {
  const list = useMemo(() => Object.values(txs || {}), [txs]);
  return (
    <StyledContainer>
      {!loading && !!list?.length && list.map((tx: any) => <History tx={tx} key={tx.tx} />)}
      {!loading && !list?.length && <Empty>No transactions</Empty>}
      {loading && (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      )}
    </StyledContainer>
  );
};

export default memo(Historys);
