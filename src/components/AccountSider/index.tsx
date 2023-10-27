import { memo, useState } from 'react';
import styled from 'styled-components';
import { useLayoutStore } from '@/stores/layout';
import TransactionTips from '@/components/Bridge/components/TransactionTips';
import useTxs from '../Bridge/hooks/useTxs';
import Actions from './components/Actions';
import Amount from './components/Amount';
import BridgeWrapper from './components/BridgeWrapper';
import Chain from './components/Chain';
import Header from './components/Header';
import Split from './components/Split';
import Tokens from './components/Tokens';

const StyledPanel = styled.div<{ display: boolean }>`
  width: 352px;
  height: calc(100vh - 40px);
  border-radius: 32px;
  border: 1px solid #343838;
  box-sizing: border-box;
  padding: 20px 0px;
  background-color: #141414;
  --padding-x: 20px;
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 50;
  transition: 0.5s;
  transform: translate(${({ display }) => (display ? 0 : 400)}px);
`;
const Content = styled.div`
  position: relative;
  z-index: 60;
`;
const Bg = styled.div`
  width: 100%;
  height: 40%;
  background: linear-gradient(45deg, rgba(235, 244, 121, 0.2) 10%, rgba(20, 20, 20, 0.8) 50%);

  position: absolute;
  z-index: 51;
  bottom: 0px;
  left: 0px;
  border-radius: 0px 0px 32px 32px;
`;
const CloseIcon = styled.div`
  position: absolute;
  padding: 5px;
  left: -27px;
  top: 16px;
  cursor: pointer;
`;
const TipsWrapper = styled.div`
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
  margin-top: 20px;
  position: relative;
`;

const AccountSider = () => {
  const [tab, setTab] = useState<'bridge' | 'account'>('account');
  const layoutStore = useLayoutStore();
  const [updater, setUpdater] = useState(1);
  const { count, txs, loading: txLoading } = useTxs(updater);

  return (
    <StyledPanel display={layoutStore.showAccountSider}>
      <Content>
        <Header />
        {tab === 'account' && (
          <>
            <Chain mt={30} />
            <Amount mt={30} />
            <Actions
              mt={30}
              onClick={(type) => {
                type === 'bridge' && setTab('bridge');
              }}
            />
            <TipsWrapper>
              <TransactionTips count={count} />
            </TipsWrapper>
            <Split mt={20} />
            <Tokens mt={20} />
          </>
        )}
        {tab === 'bridge' && (
          <BridgeWrapper
            onBack={() => {
              setTab('account');
            }}
            count={count}
            txs={txs}
            txLoading={txLoading}
            refreshTxs={() => {
              setUpdater(Date.now());
            }}
          />
        )}
      </Content>
      <Bg />
      {layoutStore.showAccountSider && (
        <CloseIcon
          onClick={() => {
            layoutStore.set({
              showAccountSider: false,
            });
          }}
        >
          <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12L6 6.5L1 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
            <path d="M9 12L14 6.5L9 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
          </svg>
        </CloseIcon>
      )}
    </StyledPanel>
  );
};

export default memo(AccountSider);
