import LandingView from '@/views/Landing';

import { useDefaultLayout } from '@/hooks/useLayout';

import type { NextPageWithLayout } from '@/utils/types';

const LandingPage: NextPageWithLayout = () => {
  return <LandingView/>;
};


LandingPage.getLayout = useDefaultLayout;

export default LandingPage;