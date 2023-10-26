import { memo, useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Chain from './components/Chain';
import Amount from './components/Amount';
import Actions from './components/Actions';
import Split from './components/Split';
import Tokens from './components/Tokens';
import BridgeWrapper from './components/BridgeWrapper';

const StyledPanel = styled.div`
  width: 352px;
  height: calc(100% - 40px);
  border-radius: 32px;
  border: 1px solid #343838;
  box-sizing: border-box;
  padding: 20px 0px;
  background-color: #141414;
  min-height: calc(100vh - 40px);
  --padding-x: 20px;
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 50;
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

const AccountSider = () => {
  const [tab, setTab] = useState<'bridge' | 'account'>('account');
  return (
    <StyledPanel>
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
            <Split mt={30} />
            <Tokens mt={20} />
          </>
        )}
        {tab === 'bridge' && (
          <BridgeWrapper
            onBack={() => {
              setTab('account');
            }}
          />
        )}
      </Content>
      <Bg />
    </StyledPanel>
  );
};

export default memo(AccountSider);
