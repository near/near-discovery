import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import type { NextPageWithLayout } from '@/utils/types';

const ApplicationsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const router = useRouter();
  const { requestAuthentication } = useSignInRedirect();

  useEffect(() => {
    const { requestAuth, createAccount } = router.query;
    if (requestAuth) {
      requestAuthentication(!!createAccount);
    }
  }, [requestAuthentication, router.query]);

  return (
    <ComponentWrapperPage
      src={components.applicationsPage}
      meta={{ title: 'NEAR | Applications', description: 'Featured applications built on NEAR' }}
    />
  );
};

ApplicationsPage.getLayout = useDefaultLayout;

export default ApplicationsPage;
