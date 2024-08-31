import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { NearContext } from '@/components/WalletSelector';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout } from '@/utils/types';

const ApplicationsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const router = useRouter();
  const { requestAuthentication } = useSignInRedirect();
  const { signedAccountId } = useContext(NearContext);

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
    const { requestAuth, createAccount } = router.query;
    if (requestAuth && !signedAccountId) {
      requestAuthentication(!!createAccount);
    }
  }, [signedAccountId, requestAuthentication, router.query]);

  return (
    <ComponentWrapperPage
      src={components.applicationsPage}
      meta={{ title: 'NEAR | Applications', description: 'Featured applications built on NEAR' }}
      componentProps={{
        targetProps: router.query,
        setURLSearchParams,
        scrollTo,
      }}
    />
  );
};

ApplicationsPage.getLayout = useDefaultLayout;

export default ApplicationsPage;
