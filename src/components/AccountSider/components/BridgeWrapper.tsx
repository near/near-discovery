import { memo, useState } from 'react';
import styled from 'styled-components';
import Bridge from '@/components/Bridge';
import BridgeHistory from '@/components/Bridge/History';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import TransactionTips from '@/components/Bridge/components/TransactionTips';
import Split from './Split';

const StyledBridgeWrapper = styled.div`
  color: #fff;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
`;
const StyledArrowIcon = styled.div`
  cursor: pointer;
  transform: rotate(90deg);
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;
const Icons = styled.div`
  display: flex;
  gap: 10px;
`;
const Icon = styled.div`
  opacity: 0.6;
`;
const TimeIcon = styled.div`
  cursor: pointer;
`;
const Box = styled.div`
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
  margin-top: 20px;
`;
const RefreshText = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  color: #979abe;
  cursor: pointer;
`;
const TipsWrapper = styled.div`
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
  margin-top: 10px;
  position: relative;

  &::after {
    content: '';
    width: 0px;
    height: 0px;
    border: 6px solid transparent;
    border-bottom-color: rgba(235, 244, 121, 0.2);
    position: absolute;
    right: 30px;
    top: -12px;
  }
`;

const BridgeWrapper = ({
  onBack,
  count,
  txs,
  txLoading,
  refreshTxs,
}: {
  onBack: () => void;
  count?: number;
  txs: any;
  txLoading?: boolean;
  refreshTxs: () => void;
}) => {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <StyledBridgeWrapper>
      <Split mt={20} />
      <Header>
        <StyledArrowIcon
          onClick={() => {
            showHistory ? setShowHistory(false) : onBack();
          }}
        >
          <ArrowIcon size={14} />
        </StyledArrowIcon>
        <Title>Bridge</Title>
        {!showHistory ? (
          <Icons>
            <Icon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.2666H17" stroke="white" stroke-width="2" stroke-linecap="round" />
                <path d="M1 13.8667H17" stroke="white" stroke-width="2" stroke-linecap="round" />
                <circle cx="11" cy="4" r="3" fill="#141414" stroke="white" stroke-width="2" />
                <circle cx="7" cy="14" r="3" fill="#141414" stroke="white" stroke-width="2" />
              </svg>
            </Icon>
            <TimeIcon
              onClick={() => {
                setShowHistory(true);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_373_4891)">
                  <path
                    d="M8 14.6667C11.682 14.6667 14.6667 11.682 14.6667 8C14.6667 4.318 11.682 1.33333 8 1.33333C4.318 1.33333 1.33333 4.318 1.33333 8C1.33333 11.682 4.318 14.6667 8 14.6667ZM8 16C3.582 16 0 12.418 0 8C0 3.582 3.582 0 8 0C12.418 0 16 3.582 16 8C16 12.418 12.418 16 8 16ZM8.66667 8.39267V4.66467C8.66667 4.302 8.368 4 8 4C7.62933 4 7.33333 4.29733 7.33333 4.66467V8.66867C7.33277 8.75518 7.34933 8.84096 7.38205 8.92105C7.41477 9.00114 7.46302 9.07396 7.524 9.13533L9.41867 11.03C9.48048 11.0914 9.55381 11.1401 9.63446 11.1731C9.71511 11.2061 9.80149 11.2229 9.88864 11.2225C9.97578 11.222 10.062 11.2044 10.1423 11.1706C10.2226 11.1367 10.2955 11.0874 10.3567 11.0253C10.4808 10.9011 10.551 10.7329 10.5519 10.5573C10.5527 10.3817 10.4843 10.2128 10.3613 10.0873L8.66667 8.39267Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_373_4891">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </TimeIcon>
          </Icons>
        ) : (
          <RefreshText
            onClick={() => {
              refreshTxs();
            }}
          >
            Refresh
          </RefreshText>
        )}
      </Header>
      {!showHistory && !!count && (
        <TipsWrapper>
          <TransactionTips count={count} />
        </TipsWrapper>
      )}
      <Box>{showHistory ? <BridgeHistory txs={txs} loading={txLoading} /> : <Bridge onSuccess={refreshTxs} />}</Box>
    </StyledBridgeWrapper>
  );
};

export default memo(BridgeWrapper);
