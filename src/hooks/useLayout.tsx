import type { ReactElement } from 'react';

import { ActivityLayout } from '@/components/layouts/ActivityLayout';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { MarketingLayout } from '@/components/layouts/MarketingLayout';
import { SimpleLayout } from '@/components/layouts/SimpleLayout';

export function useDefaultLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
}

export function useSimpleLayout(page: ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
}

export function useMarketingLayout(page: ReactElement) {
  return <MarketingLayout>{page}</MarketingLayout>;
}

// without account info
export function useActivityLayout(page: ReactElement) {
  return <ActivityLayout>{page}</ActivityLayout>;
}
