import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const LearnPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.nearOrg.learnPage}
      meta={{
        title: 'NEAR | Learn',
        description: 'Gain an understanding of the open web and the role of NEAR in that vision.',
      }}
    />
  );
};

LearnPage.getLayout = useDefaultLayout;

export default LearnPage;
