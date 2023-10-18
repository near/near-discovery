import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';

const SettingsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const idOS = useAuthStore((store) => store.idOS);

  console.log('settings | idOS: ', idOS);

  return (
    <ComponentWrapperPage
      src={components.settings.index}
      meta={{ title: 'NEAR | Settings', description: '' }}
      componentProps={{}}
    />
  );
};

SettingsPage.getLayout = useDefaultLayout;

export default SettingsPage;
