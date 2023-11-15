import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ApplicationsPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.applicationsPage}
      meta={{ title: 'NEAR | Applications', description: 'Featured applications built on NEAR' }}
    />
  );
};

ApplicationsPage.getLayout = useDefaultLayout;

export default ApplicationsPage;
