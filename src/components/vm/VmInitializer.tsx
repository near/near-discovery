import { sanitizeUrl } from '@braintree/sanitize-url';
import type { idOS } from '@idos-network/idos-sdk';
import { setupKeypom } from '@keypom/selector';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupNeth } from '@near-wallet-selector/neth';
import { setupNightly } from '@near-wallet-selector/nightly';
import { setupSender } from '@near-wallet-selector/sender';
import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet';
import Big from 'big.js';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
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
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import { useEthersProviderContext } from '@/data/web3';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';
import { recordWalletConnect, reset as resetAnalytics } from '@/utils/analytics';
import { networkId, signInContractId } from '@/utils/config';
import { idOSInit } from '@/utils/idOS';
import { KEYPOM_OPTIONS } from '@/utils/keypom-options';

export default function VmInitializer() {
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState<Big | null>(null);
  const [walletModal, setWalletModal] = useState<WalletSelectorModal | null>(null);
  const [idOS, setIdOS] = useState<idOS | null>(null);
  const ethersProviderContext = useEthersProviderContext();
  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const cache = useCache();
  const accountId = account.accountId;
  const setAuthStore = useAuthStore((state) => state.set);
  const setVmStore = useVmStore((store) => store.set);
  const { requestAuthentication, saveCurrentUrl } = useSignInRedirect();

  const init = useCallback(async () => {
    const idos = await idOSInit();
    if (idos) {
      setIdOS(idos);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    initNear &&
      initNear({
        networkId,
        walletConnectCallback: recordWalletConnect,
        selector: setupWalletSelector({
          network: networkId,
          modules: [
            setupNearWallet(),
            setupMyNearWallet(),
            setupSender(),
            setupHereWallet(),
            setupMeteorWallet(),
            setupNeth({
              gas: '300000000000000',
              bundle: false,
            }),
            setupNightly(),
            setupWelldoneWallet(),
            setupFastAuthWallet({
              relayerUrl:
                networkId === 'testnet'
                  ? 'http://34.70.226.83:3030/relay'
                  : 'https://near-relayer-mainnet.api.pagoda.co/relay',
            }),
            setupKeypom({
              trialAccountSpecs: {
                url:
                  networkId == 'testnet'
                    ? 'https://test.near.org/#trial-url/ACCOUNT_ID/SECRET_KEY'
                    : 'https://near.org/#trial-url/ACCOUNT_ID/SECRET_KEY',
                modalOptions: KEYPOM_OPTIONS(networkId),
              },
              instantSignInSpecs: {
                url:
                  networkId == 'testnet'
                    ? 'https://test.near.org/#instant-url/ACCOUNT_ID/SECRET_KEY/MODULE_ID'
                    : 'https://near.org/#instant-url/ACCOUNT_ID/SECRET_KEY/MODULE_ID',
              },
              networkId,
              signInContractId,
            }) as any, // TODO: Refactor setupKeypom() to TS
          ],
        }),
        customElements: {
          Link: ({ href, to, ...rest }: any) => <Link href={sanitizeUrl(href ?? to)} {...rest} />,
        },
        features: { enableComponentSrcDataKey: true },
      });
  }, [initNear]);

  useEffect(() => {
    if (!near) {
      return;
    }
    near.selector.then((selector: any) => {
      setWalletModal(setupModal(selector, { contractId: near.config.contractName }));
    });
  }, [near]);

  const requestSignMessage = useCallback(
    async (message: string) => {
      if (!near) {
        return;
      }
      const wallet = await (await near.selector).wallet();
      const nonce = Buffer.from(Array.from(Array(32).keys()));
      const recipient = 'social.near';

      try {
        const signedMessage = await wallet.signMessage({
          message,
          nonce,
          recipient,
        });

        if (signedMessage) {
          const verifiedFullKeyBelongsToUser = await wallet.verifyOwner({
            message: signedMessage,
          });

          if (verifiedFullKeyBelongsToUser) {
            alert(`Successfully verify signed message: '${message}': \n ${JSON.stringify(signedMessage)}`);
          } else {
            alert(`Failed to verify signed message '${message}': \n ${JSON.stringify(signedMessage)}`);
          }
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Something went wrong';
        alert(errMsg);
      }
    },
    [near],
  );

  const requestSignInWithWallet = useCallback(() => {
    saveCurrentUrl();
    walletModal?.show();
    return false;
  }, [saveCurrentUrl, walletModal]);

  const logOut = useCallback(async () => {
    if (!near) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    wallet.signOut();
    near.accountId = null;
    setSignedIn(false);
    setSignedAccountId(null);
    resetAnalytics();
    localStorage.removeItem('accountId');
  }, [near]);

  const refreshAllowance = useCallback(async () => {
    alert("You're out of access key allowance. Need sign in again to refresh it");
    await logOut();
    requestAuthentication();
  }, [logOut, requestAuthentication]);

  useEffect(() => {
    if (!near) {
      return;
    }
    setSignedIn(!!accountId);
    setSignedAccountId(accountId);
  }, [near, accountId]);

  useEffect(() => {
    setAvailableStorage(
      account.storageBalance ? Big(account.storageBalance.available).div(utils.StorageCostPerByte) : Big(0),
    );
  }, [account]);

  useEffect(() => {
    if (navigator.userAgent !== 'ReactSnap') {
      const pageFlashPrevent = document.getElementById('page-flash-prevent');
      if (pageFlashPrevent) {
        pageFlashPrevent.remove();
      }
    }
  }, []);

  useEffect(() => {
    setAuthStore({
      account,
      accountId: signedAccountId || '',
      availableStorage,
      logOut,
      refreshAllowance,
      requestSignInWithWallet,
      requestSignMessage,
      vmNear: near,
      signedIn,
      idOS,
    });
  }, [
    account,
    availableStorage,
    logOut,
    refreshAllowance,
    requestSignInWithWallet,
    requestSignMessage,
    signedIn,
    signedAccountId,
    setAuthStore,
    near,
    idOS,
  ]);

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
