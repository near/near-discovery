import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { DesktopNavigationLeft } from '../navigation/desktop/DesktopNavigationLeft';
import { LoginBox } from '../navigation/desktop/LoginBox';
import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useCurrentComponentStore } from '@/stores/current-component';
import { useRouter } from 'next/router';

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
    .tab {
      margin-bottom: 80px;
    }
  }
  @media (max-width: 900px) {
    flex-direction: column;
    .content {
      width: 100%;
      min-height: 100vh;
      padding-top: 70px;
      padding-right: 16px;
      padding-left: 16px;
    }
  }
`;

export function DefaultLayout({ children }: Props) {
  const src = useCurrentComponentStore((store) => store.src);
  const components = useBosComponents();


  const refTemplatepageSrc = 'ref-admin.near/widget/ref-template-page';
  const ZKEVMTemplateSrc = 'guessme.near/widget/ZKEVM.Template';
  const ZKEVMTemplateWarmSrc = 'guessme.near/widget/ZKEVMWarmUp.warm-up';
  const QuestionListSrc = 'guessme.near/widget/ZKEVM.QuestionList'
  const ExecuteRecordsSrc = 'guessme.near/widget/ZKEVM.ExecuteRecords'
  const BaseSrc = 'bluebiu.near/widget/Base.BaseDapps';
  const AllChainsSrc = 'bluebiu.near/widget/AllChains.AllChainsPage'

  const MantleSrc = 'bluebiu.near/widget/Mantle.MantleTemplate';

  const [showTab, setShowTab] = useState(false);

  const router = useRouter();

  const pathName = router.pathname;

  useEffect(() => {
    setShowTab(
      src !== refTemplatepageSrc &&
        src !== ZKEVMTemplateSrc &&
        src !== ZKEVMTemplateWarmSrc &&
        src !== QuestionListSrc &&
        src !== ExecuteRecordsSrc &&
        src !== BaseSrc &&
        src !== MantleSrc &&
        src !== AllChainsSrc &&
        src !== null,
    );
    // console.log('src', src);
  }, [src]);

  useEffect(() => {
    if (pathName === '/') {
      setShowTab(false);
    }
  }, [pathName]);

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
