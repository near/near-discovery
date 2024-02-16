import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { QUEST_PATH } from '@/config/quest';
import useAccount from '@/hooks/useAccount';
import { useDefaultLayout, useMarketingLayout } from '@/hooks/useLayout';
import { AUTH_TOKENS, get, getWithoutActive, post } from '@/utils/http';
import type { NextPageWithLayout } from '@/utils/types';
import Dashboard from '@/views/marketing/dashboard';
import LandingMobile from '@/views/marketing/invite-mobile';
import LandingPC from '@/views/marketing/invite-pc';

const LandingPage: NextPageWithLayout = () => {
  const { account } = useAccount();
  const router = useRouter();

  // 是否kol的账号打开此链接
  const [isKol, setIsKol] = useState(false);

  console.log('account: ', account);

  const kolName = router.query.kolName;

  async function getKolInfo() {
    const res: any = await get(`${QUEST_PATH}/api/activity/kol`, { name: kolName });

    if ((res.code as number) !== 0) return;
    const { address, avatar } = res.data;
    // setIsKol(true); //TODO DEBUG
    setIsKol(address === account);
  }

  useEffect(() => {
    getKolInfo();
  }, []);

  // return isKol ? (
  //   <Dashboard platform="kol" kolName={kolName as string} />
  // ) : isMobile ? (
  //   <LandingMobile platform="kol" kolName={kolName as string} />
  // ) : (
  //   <LandingPC platform="kol" kolName={kolName as string} />
  // );
  return isMobile ? (
    <LandingMobile platform="kol" kolName={kolName as string} />
  ) : (
    <LandingPC platform="kol" kolName={kolName as string} />
  );
};

LandingPage.getLayout = isMobile ? useMarketingLayout : useDefaultLayout;

export default LandingPage;
