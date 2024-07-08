import { setupKeypom } from '@keypom/selector';
import type { WalletSelector } from '@near-wallet-selector/core';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupMintbaseWallet } from '@near-wallet-selector/mintbase-wallet';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearMobileWallet } from '@near-wallet-selector/near-mobile-wallet';
import { setupNeth } from '@near-wallet-selector/neth';
import { setupNightly } from '@near-wallet-selector/nightly';
import { setupSender } from '@near-wallet-selector/sender';
import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet';
import Big from 'big.js';
import { isValidAttribute } from 'dompurify';
import { mapValues } from 'lodash';
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
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { useEthersProviderContext } from '@/data/web3';
import { useIdOS } from '@/hooks/useIdOS';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { useAuthStore } from '@/stores/auth';
import { useIdosStore } from '@/stores/idosStore';
import { useVmStore } from '@/stores/vm';
import {
  cookiePreferences,
  optOut,
  recordHandledError,
  recordWalletConnect,
  reset as resetAnalytics,
} from '@/utils/analytics';
import {
  commitModalBypassAuthorIds,
  commitModalBypassSources,
  isLocalEnvironment,
  networkId,
  signInContractId,
} from '@/utils/config';
import { KEYPOM_OPTIONS } from '@/utils/keypom-options';

import { useNavigationStore } from '../sidebar-navigation/store';

export default function VmInitializer() {
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState<Big | null>(null);
  const [walletModal, setWalletModal] = useState<WalletSelectorModal | null>(null);
  const ethersProviderContext = useEthersProviderContext();
  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const cache = useCache();
  const accountId = account.accountId;
  const setAuthStore = useAuthStore((state) => state.set);
  const setVmStore = useVmStore((store) => store.set);
  const { requestAuthentication, saveCurrentUrl } = useSignInRedirect();
  const idOS = useIdOS();
  const idosSDK = useIdosStore((state) => state.idOS);
  const resetNavigation = useNavigationStore((store) => store.reset);
  const router = useRouter();

  useEffect(() => {
    initNear &&
      initNear({
        networkId,
        walletConnectCallback: recordWalletConnect,
        errorCallback: recordHandledError,
        selector: setupWalletSelector({
          network: networkId,
          modules: [
            setupMyNearWallet(),
            setupSender(),
            setupHereWallet(),
            setupMintbaseWallet(),
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
                    : 'https://dev.near.org/#trial-url/ACCOUNT_ID/SECRET_KEY',
                modalOptions: KEYPOM_OPTIONS(networkId),
              },
              instantSignInSpecs: {
                url:
                  networkId == 'testnet'
                    ? 'https://test.near.org/#instant-url/ACCOUNT_ID/SECRET_KEY/MODULE_ID'
                    : 'https://dev.near.org/#instant-url/ACCOUNT_ID/SECRET_KEY/MODULE_ID',
              },
              networkId,
              signInContractId,
            }) as any, // TODO: Refactor setupKeypom() to TS
            setupLedger(),
            setupNearMobileWallet(),
          ],
        }),
        customElements: {
          Link: ({ to, href, ...rest }: { to: string | object | undefined; href: string | object }) => {
            const cleanProps = mapValues({ to, href, ...rest }, (val: any, key: string) => {
              if (!['to', 'href'].includes(key)) return val;
              if (key === 'href' && !val) val = to;
              const isAtrValid = typeof val === 'string' && isValidAttribute('a', 'href', val);
              let linkValue;
              if (isAtrValid) {
                if (val.startsWith('?')) {
                  const currentParams = new URLSearchParams(
                    Object.entries(router.query).reduce((acc, [key, value]) => {
                      if (typeof value === 'string') {
                        acc[key] = value;
                      }
                      return acc;
                    }, {} as { [key: string]: string }), // Add index signature to the object type
                  );
                  const newParams = new URLSearchParams(val);
                  newParams.forEach((value, key) => {
                    currentParams.set(key, value);
                  });

                  linkValue = `?${currentParams.toString()}`;
                } else {
                  linkValue = val;
                }
              } else {
                linkValue = 'about:blank';
              }
              return linkValue;
            });

            return <Link {...cleanProps} />;
          },
          AnalyticsCookieConsent: ({ all, onlyRequired }: { all: boolean; onlyRequired: boolean }) => {
            localStorage.setItem('cookiesAcknowledged', all ? cookiePreferences.all : cookiePreferences.onlyRequired);
            optOut(onlyRequired);
            return <></>;
          },
        },
        features: {
          commitModalBypass: {
            authorIds: commitModalBypassAuthorIds,
            sources: commitModalBypassSources,
          },
          enableComponentSrcDataKey: true,
          enableWidgetSrcWithCodeOverride: isLocalEnvironment,
        },
      });
  }, [initNear, router.query]);

  useEffect(() => {
    if (!near || !idOS) {
      return;
    }
    near.selector.then((selector: WalletSelector) => {
      const selectorModal = setupModal(selector, {
        contractId: near.config.contractName,
        methodNames: idOS.near.contractMethods,
      });
      setWalletModal(selectorModal);
    });
  }, [idOS, near]);

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
        recordHandledError({ scope: 'requestSignMessage', message: errMsg });
      }
    },
    [near],
  );

  const requestSignInWithWallet = useCallback(() => {
    saveCurrentUrl();
    walletModal?.show();
    return false;
  }, [saveCurrentUrl, walletModal]);

  useEffect(() => {
    const handleShowWalletSelector = (e: MessageEvent<{ showWalletSelector: boolean }>) => {
      if (e.data.showWalletSelector) {
        requestSignInWithWallet();
      }
    };
    window.addEventListener('message', handleShowWalletSelector, false);
    return () => {
      window.removeEventListener('message', handleShowWalletSelector, false);
    };
  }, [requestSignInWithWallet]);

  const logOut = useCallback(async () => {
    if (!near) {
      return;
    }
    await idosSDK?.reset({ enclave: true });
    useIdosStore.persist.clearStorage();
    const wallet = await (await near.selector).wallet();
    wallet.signOut();
    near.accountId = null;
    setSignedIn(false);
    setSignedAccountId(null);
    resetAnalytics();
    resetNavigation();
  }, [idosSDK, near, resetNavigation]);

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
