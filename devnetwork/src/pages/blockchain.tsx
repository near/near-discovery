import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const BlockchainPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.blockchainPage}
      meta={{
        title: 'NEAR | Blockchain',
        description:
          'Created with simplicity in mind. NEAR is built from the ground up to be performant, secure, scalable, and eco-friendly.',
      }}
    />
  );
};

BlockchainPage.getLayout = useDefaultLayout;

export default BlockchainPage;
