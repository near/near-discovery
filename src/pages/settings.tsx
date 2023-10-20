import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getClient } from '../../ldserver';

export const getStaticProps = async () => {
  const client = await getClient();
  const flags = await client.allFlagsState({
    kind: 'machine',
    key: 'vercel-for-static-deferred-pre-rendering',
  });

  return {
    props: {
      featureFlags: flags.toJSON(),
    },
  };
};

const SettingsPage: NextPageWithLayout = ({ featureFlags }) => {
  const components = useBosComponents();
  const { push } = useRouter();

  console.log('featureFlags ', featureFlags);
  useEffect(() => {
    if (!featureFlags.settings_beta_enabled) {
      push('/');
    }
  }, [featureFlags]);

  return (
    <ComponentWrapperPage
      src={components.nearOrg.ecosystemPage}
      meta={{
        title: 'NEAR.org | Settings',
        description: 'WIP Settings Area.',
      }}
    />
  );
};

SettingsPage.getLayout = useDefaultLayout;

export default SettingsPage;
