import { useCallback, useEffect } from 'react';

import { openToast } from '@/components/lib/Toast';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useIdosStore } from '@/stores/idosStore';
import type { IdosWalletInfo, NextPageWithLayout } from '@/utils/types';

const SettingsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const near = useAuthStore((store) => store.vmNear);
  const idOS = useIdosStore((state) => state.idOS);
  const idosUser = useIdosStore((state) => state.currentUser);
  const idosCredentials = useIdosStore((state) => state.credentials);
  const setIdosStore = useIdosStore((state) => state.set);

  const connectIdOS = useCallback(async () => {
    if (!near || !idOS) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    console.log('idOS init with selector: ', idOS);
    await new Promise<void>(async (resolve, reject) => {
      try {
        console.log('waiting for signer...');
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
        console.log('waiting for signature...');
        const credentials = await idOS.data.list('credentials');
        const wallets = (await idOS.data.list('wallets')) as IdosWalletInfo[];
        setIdosStore({ credentials, wallets });
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
      // window.location.href = '/settings';
      console.log('No user info found. Check if user has an fractal account.');
      openToast({
        type: 'INFO',
        title: 'No idOS profile found.',
        description: 'Need an idOS profile?',
      });
    }
  }, [idosUser]);

  useEffect(() => {
    if (idosUser && idosUser.humanId && !idosCredentials) {
      collectUserInfo();
    }
  }, [collectUserInfo, idosCredentials, idosUser]);

  // useEffect(() => {
  //   if (idOS && near && near.accountId && !idosUser) {
  //     connectIdOS();
  //   }
  // }, [connectIdOS, idOS, idosUser, near]);

  console.log(
    'idOS: ',
    idOS,
    'idosCurrentUser: ',
    idosUser,
    'idosCredentials: ',
    idosCredentials,
    'idosConnected: ',
    idosUser?.humanId ?? false,
  );

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
