import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const PapersPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  return (
    <ComponentWrapperPage
      src={components.nearOrg.papersPage}
      meta={{
        title: 'NEAR | Papers',
        description: 'Join us as we dive deep into our technology.',
      }}
      componentProps={{
        docs: {
          doomslug: '/papers/doomslug.pdf',
          nightshade: '/papers/nightshade.pdf',
          whitePaperNearProtocol: '/papers/the-official-near-white-paper.pdf',
        },
      }}
    />
  );
};

PapersPage.getLayout = useDefaultLayout;

export default PapersPage;
