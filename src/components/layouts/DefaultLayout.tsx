import type { ReactNode } from 'react';
import styled from 'styled-components';

import { NearconBanner } from '../banners/NearconBanner';
import { BosLoaderBanner } from '../BosLoaderBanner';
import { DesktopNavigationLeft } from '../navigation/desktop/DesktopNavigationLeft';
import { LoginBox } from '../navigation/desktop/LoginBox';
import { Navigation } from '../navigation/Navigation';


interface Props {
  children: ReactNode;
}

const Layout = styled.div`
  background: #1E202F;
  display:flex;
  .content{
    padding:16px 60px;
    flex-grow:1;
  }
`
export function DefaultLayout({ children }: Props) {
  return (
    <Layout>
      <DesktopNavigationLeft/>
      <div className='content'>
        <LoginBox/>
        {children}
      </div>
    </Layout>
  );
}
