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

  console.log('settings | idOS: ', idOS);

  const connectIdOS = useCallback(async () => {
    if (!idOS) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    if (!wallet) {
      return;
    }
    console.log('wallet: ', wallet);
    try {
      await idOS?.auth.setNearSigner(wallet); // a WalletSelector.Wallet
      await idOS?.crypto.init();
    } catch (error: any) {
      console.error('Failed to set signer: ', error);
    }
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

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

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
