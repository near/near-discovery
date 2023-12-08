import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import AccountSider from '../AccountSider';
import { DesktopNavigationLeft } from '../navigation/desktop/DesktopNavigationLeft';
import { DesktopNavigationTop } from '../navigation/desktop/DesktopNavigationTop';
import { LoginBox } from '../navigation/desktop/LoginBox';

interface Props {
  children: ReactNode;
}

const Layout = styled.div`
  background: #16181d;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .content {
    padding: 54px 36px;
    flex-grow: 1;
    position: relative;

    box-sizing: border-box;
  }
`;

export function DefaultLayout({ children }: Props) {
  const router = useRouter();

  const pathName = router.pathname;
  return (
    <Layout>
      {pathName !== '/uniswap' && <DesktopNavigationTop />}

      <div className="content">
        {/* <div style={{ display: 'none' }}>
          <LoginBox />
        </div> */}
        {children}
      </div>
      <AccountSider />
    </Layout>
  );
}
