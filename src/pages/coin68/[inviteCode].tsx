import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LandingMobile from '@/views/marketing/mobile';
import LandingPC from '@/views/marketing/pc';

const LandingPage: NextPageWithLayout = () => {
  // from coin68 user
  const router = useRouter();
  console.log('router:', router);

  const inviteCode = router.query.inviteCode;

  return isMobile ? (
    <LandingMobile platform="coin68" from="bgUser" inviteCode={inviteCode as string} />
  ) : (
    <LandingPC platform="coin68" from="bgUser" inviteCode={inviteCode as string} />
  );
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
