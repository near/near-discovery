import type { ReactNode } from 'react';

import { BosLoaderBanner } from '../client/BosLoaderBanner';
import { Navigation } from '../navigation/Navigation';

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <>
      <Navigation />
      <BosLoaderBanner />

      {children}
    </>
  );
}
