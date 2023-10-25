import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { DesktopNavigationLeft } from '../navigation/desktop/DesktopNavigationLeft';
import { DesktopNavigationTop } from '../navigation/desktop/DesktopNavigationTop';
import { LoginBox } from '../navigation/desktop/LoginBox';

interface Props {
  children: ReactNode;
}

const Layout = styled.div`
  background: #1e202f;
  display: flex;
  .content {
    padding: 54px 36px;
    flex-grow: 1;
    position: relative;

    width: calc(100vw - 300px);
    height: 100%;
    min-height: 100vh;
  }
`;

export function DefaultLayout({ children }: Props) {

  const router = useRouter();

  const pathName = router.pathname;

  return (
    <Layout>
      {pathName !== '/uniswap' && <DesktopNavigationLeft />}

      <div className="content">
        <LoginBox />
        {children}
      </div>
    </Layout>
  );
}
