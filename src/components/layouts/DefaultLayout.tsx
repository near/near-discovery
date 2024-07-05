import { type ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BosLoaderBanner } from '../BosLoaderBanner';
import { MarketingNavigation } from '../marketing-navigation/MarketingNavigation';
import { useSidebarLayoutEnabled } from '../sidebar-navigation/hooks';
// import { LargeScreenHeader } from '../sidebar-navigation/LargeScreenHeader';
import { SidebarNavigation } from '../sidebar-navigation/SidebarNavigation';
import { useNavigationStore } from '../sidebar-navigation/store';
import { SMALL_SCREEN_LAYOUT_MAX_WIDTH } from '../sidebar-navigation/utils';

interface Props {
  children: ReactNode;
}

const Wrapper = styled.div<{
  $animate: boolean;
  $sidebar: boolean;
}>`
  --sidebar-expand-transition-speed: ${(p) => (p.$animate ? '300ms' : '0ms')};
  --sidebar-width-expanded: 256px;
  --sidebar-width-collapsed: 68px;
  --header-height: 64px;

  display: flex;
  min-height: 100vh;
  min-width: 0;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: ${(p) => (p.$sidebar ? 'row' : 'column')};

  @media (max-width: ${SMALL_SCREEN_LAYOUT_MAX_WIDTH}px) {
    --sidebar-width-expanded: 100vw;
    flex-direction: column;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: stretch;
  align-items: stretch;
  min-width: 0;
`;

export function DefaultLayout({ children }: Props) {
  const [sidebarLayoutShouldAnimate, setSidebarLayoutShouldAnimate] = useState(false);
  const sidebarLayoutHasInitialized = useNavigationStore((store) => store.hasInitialized);
  const { sidebarLayoutEnabled } = useSidebarLayoutEnabled();

  useEffect(() => {
    /*
      We need to temporarily disable transition animations for the sidebar
      until the expanded preference has resolved from local storage. Without
      this logic, the sidebar would animate to collapsed on page load if the
      user prefers the sidebar collapsed - the sidebar should initialize in
      its proper collapsed or expanded state with animating on page load.
    */

    if (sidebarLayoutHasInitialized) {
      setTimeout(() => {
        setSidebarLayoutShouldAnimate(true);
      }, 100);
    }
  }, [sidebarLayoutHasInitialized]);

  return (
    <Wrapper $animate={sidebarLayoutShouldAnimate} $sidebar={sidebarLayoutEnabled}>
      {sidebarLayoutEnabled ? <SidebarNavigation /> : <MarketingNavigation />}

      <Content>
        {/* {sidebarLayoutEnabled && <LargeScreenHeader />} */}

        <BosLoaderBanner />

        {children}
      </Content>
    </Wrapper>
  );
}
