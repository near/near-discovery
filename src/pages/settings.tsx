import type { WalletSelector } from '@near-wallet-selector/core';
import hereImage from '@near-wallet-selector/here-wallet/assets/here-wallet-icon.png';
import meteorImage from '@near-wallet-selector/meteor-wallet/assets/meteor-icon.png';
import myNearImage from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
import nightlyImage from '@near-wallet-selector/nightly/assets/nightly.png';
import { useCallback, useState } from 'react';

import { openToast } from '@/components/lib/Toast';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useIdosStore } from '@/stores/idosStore';
import type { NextPageWithLayout } from '@/utils/types';

const SettingsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const near = useAuthStore((store) => store.vmNear);
  const accountId = useAuthStore((store) => store.accountId);
  const idOS = useIdosStore((state) => state.idOS);
  const idosProfileExist = useIdosStore((state) => state.hasProfile);
  const idosCredentials = useIdosStore((state) => state.credentials);
  const connectedWallet = useIdosStore((state) => state.connectedWallet);
  const setIdosStore = useIdosStore((state) => state.set);
  const [error, setError] = useState<string | null>(null);

  const connectIdOS = useCallback(async () => {
    if (!near || !idOS || !accountId) return;
    const wallet = (await (await near.selector).wallet()) as WalletSelector['wallet'] | any;
    const hasProfile = await idOS.hasProfile(accountId);
    setIdosStore({ hasProfile, connectedWallet: wallet.id });
    try {
      if (hasProfile) {
        await idOS.setSigner('NEAR', wallet);
        const credentials = idosCredentials ?? (await idOS.data.list('credentials'));
        setIdosStore({ credentials });
      }
    } catch (error: any) {
      console.error('Failed to init wallet + idOS: ', error);
      const errorMessage = error.message ? error.message : 'unknown';
      setError(errorMessage);
    } finally {
      if (!idosCredentials && error) {
        openToast({
          type: 'ERROR',
          title: 'Failed to init wallet + idOS:',
          description: `${error}`,
        });
      }
    }
  }, [near, idOS, accountId, setIdosStore, idosCredentials, error]);

  const walletImages = [
    { name: 'meteor-wallet', ...meteorImage },
    { name: 'here-wallet', ...hereImage },
    { name: 'my-near-wallet', ...myNearImage },
    { name: 'nightly-wallet', ...nightlyImage },
  ];

  return (
    <ComponentWrapperPage
      src={components.settings.index}
      meta={{ title: 'NEAR | Settings', description: '' }}
      componentProps={{
        idosConnected: !accountId ? false : idosProfileExist,
        connectIdOS,
        idosCredentials: !accountId ? undefined : idosCredentials,
        showTooltip: false,
        walletImages,
        connectedWallet: !accountId ? undefined : connectedWallet,
      }}
    />
  );
};

SettingsPage.getLayout = useDefaultLayout;

export default SettingsPage;
