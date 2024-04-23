import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ComponentsPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.aiPage}
      componentProps={{}}
      meta={{
        title: 'AI is NEAR',
        description: 'Find Agents, Datasets, Models, Frameworks, build your own or customize AI to work for you.',
      }}
    />
  );
};

ComponentsPage.getLayout = useDefaultLayout;

export default ComponentsPage;
