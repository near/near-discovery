import { useCallback, useEffect } from 'react';

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
  const idOS = useIdosStore((state) => state.idOS);
  const idosUser = useIdosStore((state) => state.currentUser);
  const idosCredentials = useIdosStore((state) => state.credentials);
  const setIdosStore = useIdosStore((state) => state.set);
  const createAccountUrl =
    'https://app.fractal.id/authorize?client_id=PXAbBxPErSPMXiKmMYQ3ged8Qxwqg1Px7ymhsuhaGP4&redirect_uri=https%3A%2F%2Fnear.org%2Fsettings&response_type=code&scope=contact%3Aread%20verification.uniqueness%3Aread%20verification.uniqueness.details%3Aread%20verification.idos%3Aread%20verification.idos.details%3Aread%20verification.wallet-near%3Aread%20verification.wallet-near.details%3Aread';

  const connectIdOS = useCallback(async () => {
    if (!near || !idOS) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    await new Promise<void>(async (resolve, reject) => {
      try {
        const currentUser = (await idOS.setSigner('NEAR', wallet)) as any;
        setIdosStore({ currentUser });
        resolve();
      } catch (error: any) {
        console.error('Failed to init wallet + idOS: ', error);
        const errorMessage = error.message ? error.message : 'unknown';
        openToast({
          type: 'ERROR',
          title: 'Failed to init wallet + idOS:',
          description: `${errorMessage}`,
        });
        reject();
      }
    });
  }, [idOS, near, setIdosStore]);

  const collectUserInfo = useCallback(async () => {
    if (!idOS) {
      return;
    }

    await new Promise<void>(async (resolve, reject) => {
      try {
        const credentials = await idOS.data.list('credentials');
        setIdosStore({ credentials });
        resolve();
      } catch (error: any) {
        const errorMessage = error.message ? error.message : 'unknown';
        console.error('Failed to get credentials: ', error);
        openToast({
          type: 'ERROR',
          title: 'Failed to get credentials from IDOS',
          description: `${errorMessage}`,
        });
        reject();
      }
    });
  }, [idOS, setIdosStore]);

  useEffect(() => {
    if (idosUser && !idosUser.humanId) {
      openToast({
        type: 'INFO',
        title: 'No idOS profile found.',
        description: "Need an idOS profile? Now you'll be redirected to the idOS website to create one.",
      });

      setTimeout(() => {
        window.location.href = createAccountUrl;
      }, 3000);
    }
  }, [idosUser, idOS]);

  useEffect(() => {
    if (idosUser && idosUser.humanId && !idosCredentials) {
      collectUserInfo();
    }
  }, [collectUserInfo, idosCredentials, idosUser]);

  return (
    <ComponentWrapperPage
      src={components.settings.index}
      meta={{ title: 'NEAR | Settings', description: '' }}
      componentProps={{
        idosConnected: idosUser?.humanId ?? false,
        connectIdOS,
        idosCredentials,
      }}
    />
  );
};

SettingsPage.getLayout = useDefaultLayout;

export default SettingsPage;
