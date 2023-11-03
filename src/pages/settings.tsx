// import { idOS } from '@idos-network/idos-sdk';
import { useCallback, useEffect, useState } from 'react';

import { openToast } from '@/components/lib/Toast';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
// import { useIdOS } from '@/hooks/useIdOS';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import { useIdosStore } from '@/stores/idosStore';
import type { IdosUser, NextPageWithLayout } from '@/utils/types';


const SettingsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  // const idOS = useAuthStore((store) => store.idOS);
  const near = useAuthStore((store) => store.vmNear);
  const accountId = useAuthStore((store) => store.accountId);
  const [idosConnected, setIdosConnected] = useState(false);
  const [idosUser, setIdosUser] = useState<IdosUser | undefined>(undefined);
  const [idosCredentials, setIdosCredentials] = useState<any>(null);
  // const idOS = useIdOS();
  const idOS = useIdosStore((state) => state.idOS);

  const connectIdOS = useCallback(async () => {
    if (!near || !idOS) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    console.log('idOS init with selector: ', idOS);
    try {
      // NOTE setting up for querying the idOS
      await idOS.auth.setNearSigner(wallet);
      console.log('setNearSigner done.');
      // await idOS.crypto.init();
      // console.log('idOS.crypto.init() done.');

      // NOTE setting up for using access grants
      // await idOS.grants.init({ type: 'near', accountId, wallet });
      setIdosConnected(true);
      console.log('wallet selector + idOS is ready.', 'idosConnected: ', idosConnected);
    } catch (error) {
      console.error('Failed to init wallet + idOS: ', error);
    }
  }, [idOS, idosConnected, near]);

  // const getCurrentUser = useCallback(async () => {
  //   if (!idOS) return null;
  //   console.log('getCurrentUser idOS: ', idOS);
  //   const wallet = await (await near.selector).wallet();
  //   let currentUser;
  //   await new Promise<void>(async (resolve, reject) => {
  //     try {
  //       console.log('waiting for signature...');
  //       currentUser = await idOS?.setSigner("NEAR", wallet);
  //       resolve();
  //     } catch (error: any) {
  //       const errorMessage = error.message ? error.message : 'unknown';
  //       console.error('Failed to get credentials: ', error);
  //       openToast({
  //         type: 'ERROR',
  //         title: 'Failed to get credentials from IDOS',
  //         description: `${errorMessage}`,
  //       });
  //       reject();
  //     }
  //   });

  //   console.log('currentUser: ', currentUser);
  // }, [idOS, near]);

  const checkUserInfo = useCallback(async () => {
    if (!idOS) {
      return;
    }
    try {
      console.log('idOS: ', idOS);
      const userInfo = await idOS.auth.currentUser();
      if (!userInfo) {
        console.log('No user info found.');
      }
      setIdosUser(userInfo);
    } catch (error: any) {
      const errorMessage = error.message ? error.message : 'unknown';
      console.error('Failed to get user info: ', error);
      openToast({
        type: 'ERROR',
        title: 'Failed to get user info from IDOS',
        description: `${errorMessage}`,
      });
    }
  }, [idOS]);

  const collectUserInfo = useCallback(async () => {
    if (!idOS || !idosUser) {
      return;
    }

    console.log('collecting user info...', idosUser);

    let credentials;
    await new Promise<void>(async (resolve, reject) => {
      try {
        console.log('waiting for signature...');
        credentials = await idOS.data.list('credentials');
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
    setIdosCredentials(credentials);
  }, [idOS, idosUser]);

  useEffect(() => {
    if (idosConnected) {
      checkUserInfo();
    }
  }, [checkUserInfo, idosConnected]);

  useEffect(() => {
    if (idosConnected && idosUser) {
      console.log('idosUser: ', idosUser);
      collectUserInfo();
    }
  }, [collectUserInfo, idosConnected, idosUser]);

  // useEffect(() => {
  //   if (!idOS || !near || !accountId) {
  //     console.log("connect idos from settings: ", idOS);
  //     return;
  //   }
  //   connectIdOS();
  // }, [accountId, connectIdOS, idOS, near]);

  console.log('idOS: ', idOS, 'idosUser: ', idosUser, 'idosCredentials: ', idosCredentials);

  return (
    <ComponentWrapperPage
      src={components.settings.index}
      meta={{ title: 'NEAR | Settings', description: '' }}
      componentProps={{ idosConnected, connectIdOS, idosCredentials }}
    />
  );
};

SettingsPage.getLayout = useDefaultLayout;

export default SettingsPage;
