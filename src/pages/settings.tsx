import { setupModal } from '@near-wallet-selector/modal-ui';
import { useCallback, useEffect } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import type { NextPageWithLayout } from '@/utils/types';

const SettingsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const idOS = useAuthStore((store) => store.idOS);
  const near = useAuthStore((store) => store.vmNear);

  // console.log('settings | idOS: ', idOS);

  const connectIdOS = useCallback(async () => {
    if (!near || !idOS) {
      return;
    }
    // const contractId = idOS.grants.near.defaultContractId; // returns undefined
    console.log('idOS init with selector: ', idOS);
    console.log('near: ', near);
    console.log('near.config.contractName: ', near.config.contractName);

    near.selector.then((selector: any) => {
      const selectorModal = setupModal(selector, {
        contractId: near.config.contractName,
        methodNames: idOS.grants.near.contractMethods,
      });
      selectorModal.on('onHide', async () => {
        try {
          // console.log("selectorModal: ", selectorModal);
          const wallet = await selector.wallet();
          console.log('wallet: ', wallet);
          await idOS.auth.setNearSigner(wallet);
          await idOS.crypto.init();
          console.log('wallet selector + idOS is ready');
        } catch (error) {
          console.error('Failed to init wallet + idOS: ', error);
        }
      });
      selectorModal.show();
    });
  }, [idOS, near]);

  const getUserInfo = useCallback(async () => {
    if (!idOS) {
      return;
    }
    try {
      // const userInfo = await idOS.auth.currentUser();
      const credentials = await idOS.data.list('credentials');
      console.log('credentials: ', credentials);
      return credentials;
    } catch (error: any) {
      console.error('Failed to get user info: ', error);
    }
  }, [idOS]);

  // useEffect(() => {
  //   getUserInfo();
  // }, [getUserInfo]);

  return (
    <ComponentWrapperPage
      src={components.settings.index}
      meta={{ title: 'NEAR | Settings', description: '' }}
      componentProps={{ idOS: null, connectIdOS, getUserInfo }}
    />
  );
};

SettingsPage.getLayout = useDefaultLayout;

export default SettingsPage;
