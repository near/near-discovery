import { isMobile } from 'react-device-detect';

import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LandingMobile from '@/views/marketing/mobile';
import LandingPC from '@/views/marketing/pc';

const LandingPage: NextPageWithLayout = () => {
  // from namlongdao

  return isMobile ? <LandingMobile from="bg" platform="namlongdao" /> : <LandingPC from="bg" platform="namlongdao" />;
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
