import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const FoundersPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  return (
    <ComponentWrapperPage
      src={components.nearOrg.foundersPage}
      meta={{
        title: 'NEAR | Founders',
        description: '',
      }}
    />
  );
};

FoundersPage.getLayout = useDefaultLayout;

export default FoundersPage;
