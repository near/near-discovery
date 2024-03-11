import type { ReactNode } from 'react';
import styled from 'styled-components';

import { BosLoaderBanner } from '../BosLoaderBanner';
import { Navigation } from '../navigation/Navigation';

interface Props {
  children: ReactNode;
}

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  min-height: 100vh;
  justify-content: stretch;
  align-items: stretch;
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
