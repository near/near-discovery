import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const FastAuthAndRelayersPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.fastAuthAndRelayersPage}
      meta={{
        title: 'NEAR | Fast Auth & Relayers',
        description: 'No seed phrase, no gas, no friction. Bring users on chain in seconds with FastAuth and Relayers.',
      }}
    />
  );
};

FastAuthAndRelayersPage.getLayout = useDefaultLayout;

export default FastAuthAndRelayersPage;
