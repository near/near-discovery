import type { ReactNode } from 'react';
import styled from 'styled-components';

import { BosLoaderBanner } from '../BosLoaderBanner';
import { Navigation } from '../navigation/Navigation';

interface Props {
  children: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  min-width: 0;
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
  return (
    <Wrapper>
      <Navigation />

      <Content>
        <BosLoaderBanner />
        {children}
      </Content>
    </Wrapper>
  );
}
