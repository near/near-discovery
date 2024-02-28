import { isMobile } from 'react-device-detect';

import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LandingMobile from '@/views/marketing/dapdap-invite';

const LandingPage: NextPageWithLayout = () => {
  return <LandingMobile platform="dapdapinvite" />;
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
