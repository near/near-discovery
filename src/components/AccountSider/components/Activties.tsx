import { memo } from 'react';
import styled from 'styled-components';
import CurrencyIcon from '@/components/CurrencyIcon';

import useChain from '@/hooks/useChain';
import { useTransactionsStore } from '@/stores/transactions';
import useAccount from '@/hooks/useAccount';

import { fToNow } from '@/utils/format-time';

const StyledContainer = styled.div<{ mt?: number }>`
  margin-top: ${({ mt }) => mt + 'px'};
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
  max-height: calc(100vh - 400px);
  overflow-y: auto;
  padding-top: 5px;
`;
const ActivtyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0px;
  cursor: pointer;
`;
const TokenWrapper = styled.div`
  display: flex;
  align-items: center;
  .icon {
    margin-right: 10px;
  }
`;
const IconsWrapper = styled.div`
  position: relative;

  .icon-source {
    transform: translate(2px, 10px);
  }
  .icon-target {
    transform: translate(14px, -9px);
  }
`;
const TokenDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const StyledTitle = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const StyledDesc = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledRight = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const StyledTime = styled.div`
  color: #979abe;
  text-align: right;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Empty = styled.div`
  text-align: center;
  padding-top: 60px;
  color: #fff;
`;

const Activty = ({ icons, failed, tx, handler, desc, time }: any) => {
  const { chainId } = useAccount();
  const chain = useChain(chainId);
  return (
    <ActivtyWrapper
      onClick={() => {
        if (chain?.blockExplorers && tx) {
          window.open(`${chain.blockExplorers}/tx/${tx}`, '_blank');
        }
      }}
    >
      <TokenWrapper>
        {icons.length === 1 && <CurrencyIcon className="icon" size={38} token={icons[0]} />}
        {icons.length === 2 && (
          <IconsWrapper>
            <CurrencyIcon className="icon-source" size={26} token={icons[0]} />
            <CurrencyIcon className="icon-target" size={26} token={icons[1]} />
          </IconsWrapper>
        )}
        <TokenDesc>
          <StyledTitle>{handler}</StyledTitle>
          <StyledDesc>{desc}</StyledDesc>
        </TokenDesc>
      </TokenWrapper>
      <StyledRight>
        {failed && (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.10016 1C7.86996 -0.333334 9.79446 -0.333333 10.5643 1L17.3935 12.8286C18.1633 14.1619 17.201 15.8286 15.6614 15.8286H2.00298C0.463382 15.8286 -0.498867 14.1619 0.270933 12.8286L7.10016 1ZM7.91793 6.22857C7.91793 5.72363 8.32727 5.31429 8.83221 5.31429C9.33716 5.31429 9.7465 5.72363 9.7465 6.22857V9.88572C9.7465 10.3907 9.33716 10.8 8.83221 10.8C8.32727 10.8 7.91793 10.3907 7.91793 9.88572V6.22857ZM8.83221 11.7143C8.32727 11.7143 7.91793 12.1236 7.91793 12.6286C7.91793 13.1335 8.32727 13.5429 8.83221 13.5429C9.33716 13.5429 9.7465 13.1335 9.7465 12.6286C9.7465 12.1236 9.33716 11.7143 8.83221 11.7143Z"
              fill="#FF75BF"
            />
          </svg>
        )}
        <StyledTime>{fToNow(time)}</StyledTime>
      </StyledRight>
    </ActivtyWrapper>
  );
};

const Activties = ({ mt }: { mt?: number }) => {
  const transactions = useTransactionsStore((store: any) => store.getTransactions());
  return (
    <StyledContainer mt={mt}>
      {transactions.map((transaction: any) => (
        <Activty key={transaction.tx} {...transaction} />
      ))}
      {transactions.length === 0 && <Empty>No activties</Empty>}
    </StyledContainer>
  );
};

export default memo(Activties);
