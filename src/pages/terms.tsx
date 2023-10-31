import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const TermsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const termsDomainName = `${process.env.NEXT_PUBLIC_TOS_SUBDOMAIN_NAME}/ipfs/${process.env.NEXT_PUBLIC_TERMS_CID}`;

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
