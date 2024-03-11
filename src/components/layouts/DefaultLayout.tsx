import type { ReactNode } from 'react';

import { BosLoaderBanner } from '../BosLoaderBanner';
import { NavigationDeprecated } from '../navigation-deprecated/Navigation';

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <>
      <NavigationDeprecated />
      <BosLoaderBanner />

      {children}
    </>
  );
}
