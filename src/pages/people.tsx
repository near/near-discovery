import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useWidgets } from '@/hooks/useWidgets';
import type { NextPageWithLayout } from '@/utils/types';

const PeoplePage: NextPageWithLayout = () => {
  const widgets = useWidgets();

  return (
    <ComponentWrapperPage
      src={widgets.peoplePage}
      meta={{ title: 'Connect with the NEAR community.', description: 'Become part of the NEAR community.' }}
    />
  );
};

PeoplePage.getLayout = useDefaultLayout;

export default PeoplePage;
