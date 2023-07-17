import type { ReactNode } from 'react';

import { NearconBanner } from '../banners/NearconBanner';
import { BosLoaderBanner } from '../BosLoaderBanner';
import { Navigation } from '../navigation/Navigation';

interface Props {
  children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
  return (
    <>
      <NearconBanner />
      <Navigation />
      <BosLoaderBanner />

      {children}
    </>
  );
}
