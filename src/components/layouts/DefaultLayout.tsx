import type { ReactNode } from 'react';
import styled from 'styled-components';

import { useAuthStore } from '@/stores/auth';

import { BosLoaderBanner } from '../BosLoaderBanner';
import { Navigation } from '../navigation/Navigation';
import { NavigationSignedOut } from '../navigation-signed-out/NavigationSignedOut';

interface Props {
  children: ReactNode;
}

const Wrapper = styled.div<{
  $horizontal: boolean;
}>`
  display: flex;
  min-width: 0;
  flex-direction: ${(p) => (p.$horizontal ? 'row' : 'column')};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  min-height: 100vh;
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
        <BosLoaderBanner />
        {children}
      </Content>
    </Wrapper>
  );
}
