import type { ReactNode } from 'react';
import styled from 'styled-components';

import { DesktopNavigationLeft } from '../navigation/desktop/DesktopNavigationLeft';
import { LoginBox } from '../navigation/desktop/LoginBox';
import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useCurrentComponentStore } from '@/stores/current-component';



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
    .tab{
      margin-bottom:80px;
    }
  }
  @media (max-width: 900px) {
    flex-direction:column;
    .content{
      width: 100%;
      min-height:100vh;
    }
  }
`;

export function DefaultLayout({ children }: Props) {

  const src = useCurrentComponentStore((store) => store.src);
  const components = useBosComponents();

  const refTemplatepageSrc = 'ref-admin.near/widget/ref-template-page'
  const ZKEVMTemplateSrc = 'guessme.near/widget/ZKEVM.Template'

  const showTab = src !== refTemplatepageSrc && src !== ZKEVMTemplateSrc;

  return (
    <Layout>
      <DesktopNavigationLeft />
      <div className="content">
        {showTab && (
          <div className="tab">
            <VmComponent src={components.tabNavigation} props={{ src: src }} />
          </div>
        )}
        <LoginBox />
        {children}
      </div>
    </Layout>
  );
}
