import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useCurrentComponentStore } from '@/stores/current-component';

import { DesktopNavigationLeft } from '../navigation/desktop/DesktopNavigationLeft';
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
    .tab {
      margin-bottom: 80px;
    }
  }
  @media (max-width: 900px) {
    flex-direction: column;
    .content {
      width: 100%;
      min-height: 100vh;
      padding-top: 80px;
      padding-right: 4px;
      padding-left: 4px;

      .tab {
        margin-bottom: 0px;
      }
    }
    overflow-x: hidden;
  }
`;

const SPECIAL_URL_MAP: { [key: string]: string } = {
  'ref-home': '/near',
  xBox: '/near',
  nearcolumn: '/near',
  'MetaPool.Stake': '/near',
  'ZKEVMSwap.zkevm-swap': '/polygon-zkevm',
  'ZKEVM-all-in-one': '/polygon-zkevm',
  'ZKEVMSwap.zkevm-bridge': '/polygon-zkevm',
  'ZKEVM.GAMMA': '/polygon-zkevm',
  'ZKEVM.AAVE': '/polygon-zkevm',
  zkevmcolumn: '/polygon-zkevm',
  '0vix.Lending': '/polygon-zkevm',
  'ZKEVM.ExecuteRecords': '/warmup',
  'ZKEVM.QuestionList': '/warmup',
  warmup: '/warmup',
  'Base.BaseDex': '/base',
  'Mantle.Swap': '/mantle',
  'Mantle.GAMMA': '/mantle',
  'Arbitrum.Swap.Dex': '/arbitrum',
  'Arbitrum.Pendle.TradeMarkets': '/arbitrum',
  'Arbitrum.Pendle.TradeSwap': '/arbitrum',
};

export function DefaultLayout({ children }: Props) {
  const src = useCurrentComponentStore((store) => store.src);
  const components = useBosComponents();

  const refTemplatepageSrc = 'ref-admin.near/widget/ref-template-page';
  const ZKEVMTemplateSrc = 'guessme.near/widget/ZKEVM.Template';
  const ZKEVMTemplateWarmSrc = 'guessme.near/widget/ZKEVMWarmUp.warm-up';
  const QuestionListSrc = 'guessme.near/widget/ZKEVM.QuestionList';
  const ExecuteRecordsSrc = 'guessme.near/widget/ZKEVM.ExecuteRecords';
  const BaseSrc = 'bluebiu.near/widget/Base.BaseDapps';
  const ArbitrumSrc = 'bluebiu.near/widget/Arbitrum.Dapps';
  const AllChainsSrc = 'bluebiu.near/widget/AllChains.AllChainsPage';

  const MantleSrc = 'bluebiu.near/widget/Mantle.MantleTemplate';

  const [showTab, setShowTab] = useState(false);

  const router = useRouter();

  const pathName = router.pathname;
  const componentName = router.query.componentName as string;

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
        src !== ArbitrumSrc &&
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
            <VmComponent
              src={components.tabNavigation}
              props={{
                src: src,
                toUrl: SPECIAL_URL_MAP[componentName] ? SPECIAL_URL_MAP[componentName] : document.referrer || '/',
              }}
            />
          </div>
        )}
        <LoginBox />
        {children}
      </div>
    </Layout>
  );
}
