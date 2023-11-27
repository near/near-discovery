import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLayoutStore } from '@/stores/layout';
import useTxs from '../Bridge/hooks/useTxs';
import BridgeWrapper from './components/BridgeWrapper';
import Header from './components/Header';
import AccountWrapper from './components/AccountWrapper';

const StyledPanel = styled.div<{ display: number }>`
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

const AccountSider = () => {
  const layoutStore = useLayoutStore();
  const defaultTab = layoutStore.defaultTab;
  const [tab, setTab] = useState<'bridge' | 'account'>('account');
  const [showChains, setShowChains] = useState(false);
  const [showCodes, setShowCodes] = useState(false);

  useEffect(() => {
    if (layoutStore.showAccountSider && defaultTab === 'bridge') {
      setTab('bridge');
    }
  }, [layoutStore.showAccountSider, defaultTab]);

  const [updater, setUpdater] = useState(1);
  const { count, txs, loading: txLoading } = useTxs(updater);

  useEffect(() => {
    if (showChains) setShowCodes(false);
  }, [showChains]);

  useEffect(() => {
    if (showCodes) setShowChains(false);
  }, [showCodes]);

  return (
    <StyledPanel display={layoutStore.showAccountSider ? 1:0}>
      <Content>
        <Header showCodes={showCodes} setShowCodes={setShowCodes} />
        {tab === 'account' && (
          <AccountWrapper count={count} setTab={setTab} showChains={showChains} setShowChains={setShowChains} />
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
            <path d="M1 12L6 6.5L1 1" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 12L14 6.5L9 1" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </CloseIcon>
      )}
    </StyledPanel>
  );
};

export default memo(AccountSider);
