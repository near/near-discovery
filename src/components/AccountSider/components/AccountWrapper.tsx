import { useState } from 'react';
import styled from 'styled-components';

import TransactionTips from '@/components/Bridge/components/TransactionTips';

import AccountTabs from './AccountTabs';
import Actions from './Actions';
import Activties from './Activties';
import Amount from './Amount';
import Chain from './Chain';
import Tokens from './Tokens';

const TipsWrapper = styled.div`
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
  margin-top: 20px;
  position: relative;
`;

export default function AccountWrapper({
  count,
  setTab,
  showChains,
  setShowChains,
}: {
  count: number;
  setTab: (tab: 'bridge' | 'account') => void;
  showChains?: boolean;
  setShowChains?: (show: boolean) => void;
}) {
  const [accountTab, setAccountTab] = useState('Tokens');
  return (
    <>
      <Chain mt={30} showChains={showChains} setShowChains={setShowChains} />
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
      <AccountTabs
        active={accountTab}
        onTabClick={(tab: string) => {
          setAccountTab(tab);
        }}
      />
      {accountTab === 'Tokens' && <Tokens mt={20} />}
      {accountTab === 'Activties' && <Activties />}
    </>
  );
}
