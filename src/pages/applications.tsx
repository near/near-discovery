import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';

const ApplicationsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const router = useRouter();
  const { requestAuthentication } = useSignInRedirect();
  const authStore = useAuthStore();
  const accountId = authStore.accountId;

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
    if (requestAuth && !accountId) {
      requestAuthentication(!!createAccount);
    }
  }, [accountId, requestAuthentication, router.query]);

  return (
    <ComponentWrapperPage
      src={components.applicationsPage}
      meta={{ title: 'NEAR | Applications', description: 'Featured applications built on NEAR' }}
      componentProps={{
        setURLSearchParams,
        scrollTo,
      }}
    />
  );
};

ApplicationsPage.getLayout = useDefaultLayout;

export default ApplicationsPage;
