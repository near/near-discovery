import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useInititalDataWithAuth from '@/hooks/useInititalDataWithAuth';
import { useDebounceFn } from 'ahooks';
import useAccount from '@/hooks/useAccount';
import AccountSider from '../AccountSider';
import Footer from '../Footer';
import { DesktopNavigationTop } from '../navigation/desktop/DesktopNavigationTop';

interface Props {
  children: ReactNode;
}

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  .content {
    padding: 0px 0px 100px;
    flex-grow: 1;
    position: relative;
    overflow-x: hidden;
    box-sizing: border-box;
  }
`;

export function DefaultLayout({ children }: Props) {
  const router = useRouter();
  const pathName = router.pathname;
  const { account } = useAccount();
  const { getInitialDataWithAuth } = useInititalDataWithAuth();

  const { run: updateAccount } = useDebounceFn(
    () => {
      getInitialDataWithAuth(account);
    },
    { wait: 500 },
  );

  useEffect(() => {
    updateAccount();
  }, [account]);

  return (
    <Layout
      style={{
        background: router.pathname === '/odyssey/[version]' ? '#000' : '#16181d',
      }}
    >
      {pathName !== '/uniswap' && <DesktopNavigationTop />}

      <div className="content">
        {/* <div style={{ display: 'none' }}>
          <LoginBox />
        </div> */}
        {children}
      </div>
      {pathName !== '/uniswap' && <Footer />}
      <AccountSider />
    </Layout>
  );
}
