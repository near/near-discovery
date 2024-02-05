import type { WalletSelector } from '@near-wallet-selector/core';
import hereImage from '@near-wallet-selector/here-wallet/assets/here-wallet-icon.png';
import meteorImage from '@near-wallet-selector/meteor-wallet/assets/meteor-icon.png';
import myNearImage from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
import nightlyImage from '@near-wallet-selector/nightly/assets/nightly.png';
import { useCallback, useEffect, useState } from 'react';

import { openToast } from '@/components/lib/Toast';
import type { ToastType } from '@/components/lib/Toast/store';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useIdosStore } from '@/stores/idosStore';
import type { NextPageWithLayout } from '@/utils/types';
import { recordHandledError } from '@/utils/analytics';

const SettingsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const near = useAuthStore((store) => store.vmNear);
  const accountId = useAuthStore((store) => store.accountId);
  const idOS = useIdosStore((state) => state.idOS);
  const idosProfileExist = useIdosStore((state) => state.hasProfile);
  const idosCredentials = useIdosStore((state) => state.credentials);
  const connectedWallet = useIdosStore((state) => state.connectedWallet);
  const setIdosStore = useIdosStore((state) => state.set);
  const [error, setError] = useState<{ type: ToastType; title: string; description?: string } | null>(null);

  const walletImages = [
    { name: 'meteor-wallet', ...meteorImage },
    { name: 'here-wallet', ...hereImage },
    { name: 'my-near-wallet', ...myNearImage },
    { name: 'nightly-wallet', ...nightlyImage },
  ];

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
      } else {
        setError({
          type: 'INFO',
          title: `No idOS profile found for ${accountId}`,
        });
      }
    } catch (error: any) {
      const scope = 'Failed to init wallet + idOS: ';
      console.error(scope, error);
      const errorMessage = error.message ? error.message : 'unknown';
      recordHandledError({ scope, message: errorMessage || error });
      setError({
        type: 'ERROR',
        title: 'Falilure during idOS initialization:',
        description: `${errorMessage}`,
      });
    }
  }, [near, idOS, accountId, setIdosStore, idosCredentials]);

  useEffect(() => {
    if (!idosCredentials && error) {
      openToast({
        type: error.type,
        title: error.title,
        description: error.description,
      });
    }
  }, [error, idosCredentials]);

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
