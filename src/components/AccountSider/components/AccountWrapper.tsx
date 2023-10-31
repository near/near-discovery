import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TransactionTips from '@/components/Bridge/components/TransactionTips';
import Actions from './Actions';
import Amount from './Amount';
import Chain from './Chain';
import Split from './Split';
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
      <Split mt={20} />
      <Tokens mt={20} />
    </>
  );
}
