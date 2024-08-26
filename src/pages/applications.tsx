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

  const changeUrl = (newUrl: string) => {
    if (window.location.pathname !== newUrl) {
      window.history.pushState({}, '', newUrl);
    }
  }

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
        changeUrl
      }}
    />
  );
};

ApplicationsPage.getLayout = useDefaultLayout;

export default ApplicationsPage;
