import type { WalletSelector } from '@near-wallet-selector/core';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { openToast } from '@/components/lib/Toast';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useIdosStore } from '@/stores/idosStore';
import type { IdosUser, NextPageWithLayout } from '@/utils/types';

const SettingsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const near = useAuthStore((store) => store.vmNear);
  const accountId = useAuthStore((store) => store.accountId);
  const idOS = useIdosStore((state) => state.idOS);
  const idosProfileExist = useIdosStore((state) => state.hasProfile);
  const idosCredentials = useIdosStore((state) => state.credentials);
  const setIdosStore = useIdosStore((state) => state.set);
  const [error, setError] = useState<string | null>(null);
  // const [showTooltip, setShowTooltip] = useState(false);
  const createAccountUrl =
    'https://app.fractal.id/authorize?client_id=PXAbBxPErSPMXiKmMYQ3ged8Qxwqg1Px7ymhsuhaGP4&redirect_uri=https%3A%2F%2Fnear.org%2Fsettings&response_type=code&scope=contact%3Aread%20verification.uniqueness%3Aread%20verification.uniqueness.details%3Aread%20verification.idos%3Aread%20verification.idos.details%3Aread%20verification.wallet-near%3Aread%20verification.wallet-near.details%3Aread';
  const router = useRouter();

  const connectIdOS = useCallback(async () => {
    if (!near || !idOS || !accountId) return;
    const wallet = (await (await near.selector).wallet()) as WalletSelector['wallet'];
    const hasProfile = await idOS.hasProfile(accountId);
    setIdosStore({ hasProfile });
    try {
      if (hasProfile) {
        await idOS.setSigner('NEAR', wallet);

        const credentials = idosCredentials ?? (await idOS.data.list('credentials'));
        setIdosStore({ credentials });
      } else {
        openToast({
          type: 'INFO',
          title: 'No idOS profile found.',
          description: "Need an idOS profile? Now you'll be redirected to the idOS website to create one.",
        });

        setTimeout(() => {
          router.push(createAccountUrl);
        }, 3000);
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
  }, [accountId, error, idOS, idosCredentials, near, router, setIdosStore]);

  // useEffect(() => {
  //   if (accountId && router && router.query && router.query.code) {
  //     setShowTooltip(true);
  //   }
  // }, [router]);

  return (
    <ComponentWrapperPage
      src={components.settings.index}
      meta={{ title: 'NEAR | Settings', description: '' }}
      componentProps={{
        idosConnected: idosProfileExist ?? false,
        connectIdOS,
        idosCredentials,
        showTooltip: false,
      }}
    />
  );
};

SettingsPage.getLayout = useDefaultLayout;

export default SettingsPage;
