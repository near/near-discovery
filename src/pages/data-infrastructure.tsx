import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const DataInfrastructurePage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.dataInfrastructurePage}
      meta={{
        title: 'NEAR | Data Infrastructure',
        description:
          'Choose the data solution that fits your needs. Access and monitor on-chain data through public datasets, or scaffold your own infrastructure.',
      }}
    />
  );
};

DataInfrastructurePage.getLayout = useDefaultLayout;

export default DataInfrastructurePage;
