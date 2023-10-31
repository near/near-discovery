import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { termsDomainName } from '@/utils/config';
import type { NextPageWithLayout } from '@/utils/types';

const TermsPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.termsPage}
      meta={{ title: 'Terms', description: '' }}
      componentProps={{
        termsDomainName,
      }}
    />
  );
};

TermsPage.getLayout = useDefaultLayout;

export default TermsPage;
