import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';

import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LandingMobile from '@/views/marketing/mobile';
import LandingPC from '@/views/marketing/pc';

const LandingPage: NextPageWithLayout = () => {
  // from bitget user
  const router = useRouter();
  console.log('router:', router);

  const inviteCode = router.query.inviteCode;

  return isMobile ? (
    <LandingMobile from="bgUser" inviteCode={inviteCode as string} />
  ) : (
    <LandingPC from="bgUser" inviteCode={inviteCode as string} />
  );
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
