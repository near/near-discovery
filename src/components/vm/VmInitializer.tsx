import {
  CommitButton,
  EthersProviderContext,
  useAccount,
  useCache,
  useInitNear,
  useNear,
  utils,
  Widget,
} from 'near-social-vm';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useEthersProviderContext } from '@/data/web3';
import { handleSignIn } from '@/redux/slices/account';
import type { AppDispatch } from '@/redux/store';
import { useVmStore } from '@/stores/vm';
import { recordWalletConnect } from '@/utils/analytics';
import { networkId } from '@/utils/config';
import { walletSelector } from '@/utils/wallet';

export default function VmInitializer() {
  const ethersProviderContext = useEthersProviderContext();
  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const cache = useCache();
  const setVmStore = useVmStore((store) => store.set);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!near || !account) {
      return;
    }

    const { storageCostPerByte } = utils;

    dispatch(handleSignIn({ account, storageCostPerByte }));
  }, [near, account, dispatch]);

  useEffect(() => {
    if (!initNear) {
      return;
    }

    initNear({
      networkId,
      walletConnectCallback: recordWalletConnect,
      selector: walletSelector(),
    });
  }, [initNear]);

  useEffect(() => {
    setVmStore({
      cache,
      CommitButton,
      ethersContext: ethersProviderContext,
      EthersProvider: EthersProviderContext.Provider,
      Widget,
      near,
    });
  }, [cache, ethersProviderContext, setVmStore, near]);

  return <></>;
}
