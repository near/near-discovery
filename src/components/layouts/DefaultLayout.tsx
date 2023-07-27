import type { ReactNode } from 'react';
import styled from 'styled-components';

import { DesktopNavigationLeft } from '../navigation/desktop/DesktopNavigationLeft';
import { LoginBox } from '../navigation/desktop/LoginBox';


interface Props {
  children: ReactNode;
}

const Layout = styled.div`
  background: #1E202F;
  display:flex;
  .content{
    position:relative;
    padding:16px 36px;
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
