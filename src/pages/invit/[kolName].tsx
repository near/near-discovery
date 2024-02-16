import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LandingMobile from '@/views/marketing/invite-mobile';
import LandingPC from '@/views/marketing/invite-pc';

const LandingPage: NextPageWithLayout = () => {
  const router = useRouter();
  console.log('router:', router);

  const kolName = router.query.kolName;
  // TODO platform from need?
  return isMobile ? (
    <LandingMobile platform="kol" kolName={kolName as string} />
  ) : (
    <LandingPC platform="kol" kolName={kolName as string} />
  );
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
