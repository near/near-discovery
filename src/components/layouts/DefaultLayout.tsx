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
  background: #000000;
  .content {
    padding: 54px 36px;
    flex-grow: 1;
    position: relative;
    height: 100%;
    min-height: 100vh;
  }
`;

export function DefaultLayout({ children }: Props) {
  const router = useRouter();

  const pathName = router.pathname;
  return (
    <Layout>
      {pathName !== '/uniswap' && <DesktopNavigationTop />}

      <div className="content">
        <div style={{ display: 'none' }}>
          <LoginBox />
        </div>
        {children}
      </div>
      <AccountSider />
    </Layout>
  );
}
