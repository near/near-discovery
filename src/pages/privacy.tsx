import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const PrivacyPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const privacyDomainName = `${process.env.NEXT_PUBLIC_TOS_SUBDOMAIN_NAME}/ipfs/${process.env.NEXT_PUBLIC_PRIVACY_CID}`;

  return (
    <ComponentWrapperPage
      src={components.nearOrg.privacyPage}
      meta={{ title: 'Privacy', description: '' }}
      componentProps={{
        privacyDomainName,
      }}
    />
  );
};

PrivacyPage.getLayout = useDefaultLayout;

export default PrivacyPage;
