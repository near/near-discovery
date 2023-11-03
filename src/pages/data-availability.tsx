import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const DataAvailabilityPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.dataAvailabilityPage}
      meta={{
        title: 'NEAR | Data Availability',
        description:
          'Simplify and lower costs in your rollup network by using NEAR as the Data Availability (DA) Layer in your Rollup Stack.',
      }}
    />
  );
};

DataAvailabilityPage.getLayout = useDefaultLayout;

export default DataAvailabilityPage;
