import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ApplicationsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const router = useRouter();
  const { signedAccountId, signIn } = useWalletSelector();

  const setURLSearchParams = (params: string | string[][] | Record<string, string> | URLSearchParams | undefined) => {
    if (!params) return;
    const searchParams = new URLSearchParams(params);
    if (searchParams.toString().length > 0) {
      window.history.pushState({}, '', '?' + searchParams.toString());
    } else {
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  const scrollTo = (options: ScrollToOptions | undefined) => {
    window.scrollTo(options);
  };

  useEffect(() => {
    const { requestAuth } = router.query;
    if (requestAuth && !signedAccountId) {
      signIn();
    }
  }, [signedAccountId, router.query, signIn]);

  return (
    <ComponentWrapperPage
      src={components.applicationsPage}
      meta={{ title: 'NEAR | Applications', description: 'Featured applications built on NEAR' }}
      componentProps={{
        ...router.query,
        setURLSearchParams,
        scrollTo,
      }}
    />
  );
};

ApplicationsPage.getLayout = useDefaultLayout;

export default ApplicationsPage;
