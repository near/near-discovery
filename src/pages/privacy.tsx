import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { privacyDomainName } from '@/utils/config';
import type { NextPageWithLayout } from '@/utils/types';

const PrivacyPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.privacyPage}
      meta={{ title: 'Privacy Policy', description: '' }}
      componentProps={{
        privacyDomainName,
      }}
    />
  );
};

PrivacyPage.getLayout = useDefaultLayout;

export default PrivacyPage;
