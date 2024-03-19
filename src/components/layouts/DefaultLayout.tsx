import type { ReactNode } from 'react';
import styled from 'styled-components';

import { useAuthStore } from '@/stores/auth';

import { BosLoaderBanner } from '../BosLoaderBanner';
import { LargeScreenHeader } from '../navigation/LargeScreenHeader';
import { Navigation } from '../navigation/Navigation';
import { SMALL_SCREEN_LAYOUT_MAX_WIDTH } from '../navigation/utils';
import { NavigationSignedOut } from '../navigation-signed-out/NavigationSignedOut';

interface Props {
  children: ReactNode;
}

const Wrapper = styled.div<{
  $horizontal: boolean;
}>`
  --sidebar-expand-transition-speed: 300ms;
  --sidebar-width-expanded: 256px;
  --sidebar-width-collapsed: 68px;
  --small-screen-header-height: 68px;

  display: flex;
  min-height: 100vh;
  min-width: 0;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: ${(p) => (p.$horizontal ? 'row' : 'column')};

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
  const signedIn = useAuthStore((store) => store.signedIn);

  return (
    <Wrapper $horizontal={signedIn}>
      {signedIn ? <Navigation /> : <NavigationSignedOut />}

      <Content>
        {signedIn && <LargeScreenHeader />}

        <BosLoaderBanner />

        {children}
      </Content>
    </Wrapper>
  );
}
