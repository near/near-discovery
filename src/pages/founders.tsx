import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { zendeskActivate } from '@/utils/zendesk';

const FoundersPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  return (
    <ComponentWrapperPage
      src={components.nearOrg.foundersPage}
      meta={{
        title: 'NEAR | FounderHub',
        description: 'FounderHub is a one-stop shop for Founders building with the near ecosystem.',
      }}
      componentProps={{
        zendeskActivate,
        docs: {
          tokenLaunchChecklist: '/papers/token-launch-checklist',
        },
      }}
    />
  );
};

FoundersPage.getLayout = useDefaultLayout;

export default FoundersPage;
