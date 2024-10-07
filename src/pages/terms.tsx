import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { termsDomainName } from '@/config';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const TermsPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.termsPage}
      meta={{ title: 'Terms of Use', description: '' }}
      componentProps={{
        termsDomainName,
      }}
    />
  );
};

TermsPage.getLayout = useDefaultLayout;

export default TermsPage;
