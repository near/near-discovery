import "@/styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "App.scss";

import type { AppProps } from "next/app";

import { NetworkId, signInContractId, Widgets } from "@/data/widgets";
import React, { useCallback, useEffect, useState } from "react";

import Big from "big.js";
import { useFlags } from "@/utils/flags";
import { Toaster } from "sonner";
import { setupFastAuth } from "@/lib/selector/setup";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import {
  setupModal,
  WalletSelectorModal,
} from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupSender } from "@near-wallet-selector/sender";
import { setupWalletSelector } from "@near-wallet-selector/core";
import {
  useAccount,
  useInitNear,
  useNear,
  utils,
  EthersProviderContext,
} from "near-social-vm";
import { useEthersProviderContext } from "@/data/web3";
import {
  init as initializeSegment,
  recordWalletConnect,
  reset as resetSegment,
} from "@/utils/analytics";
import { setupKeypom } from "keypom-js";
import { KEYPOM_OPTIONS } from "@/utils/keypom-options";
import { useRouter } from "next/router";
import { iframeRoutes } from "@/data/iframe-routes";
import { useAuthStore } from "@/stores/auth";

export default function App({ Component, pageProps }: AppProps) {
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState<Big | null>(null);
  const [walletModal, setWalletModal] = useState<WalletSelectorModal | null>(
    null
  );
  const [widgetSrc, setWidgetSrc] = useState(null);
  const [flags, setFlags] = useFlags();
  const ethersProviderContext = useEthersProviderContext();
  const router = useRouter();
  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const accountId = account.accountId;
  const updateAuthStore = useAuthStore((state) => state.update);

  initializeSegment();

  useEffect(() => {
    initNear &&
      initNear({
        networkId: NetworkId,
        walletConnectCallback: recordWalletConnect,
        selector: setupWalletSelector({
          network: NetworkId,
          modules: [
            setupNearWallet(),
            setupMyNearWallet(),
            setupSender(),
            setupHereWallet(),
            setupMeteorWallet(),
            setupNeth({
              gas: "300000000000000",
              bundle: false,
            }),
            setupFastAuth({
              networkId: NetworkId,
              signInContractId,
              relayerUrl:
                NetworkId === "testnet"
                  ? "http://34.70.226.83:3030/relay"
                  : "https://near-relayer-mainnet.api.pagoda.co/relay",
              hideModal: undefined, // TODO: Remove?
            }) as any, // TODO: Refactor setupFastAuth() to TS
            setupKeypom({
              trialBaseUrl:
                NetworkId == "testnet"
                  ? "https://test.near.org/#trial-url/"
                  : "https://near.org/#trial-url/",
              networkId: NetworkId,
              trialSplitDelim: "/",
              signInContractId,
              modalOptions: KEYPOM_OPTIONS(NetworkId),
            }) as any, // TODO: Refactor setupKeypom() to TS
          ],
        }),
      });
  }, [initNear]);

  useEffect(() => {
    if (!near) {
      return;
    }
    near.selector.then((selector: any) => {
      setWalletModal(
        setupModal(selector, { contractId: near.config.contractName })
      );
    });
  }, [near]);

  const requestSignInWithWallet = useCallback(
    (event: any) => {
      event?.preventDefault();
      walletModal?.show();
      return false;
    },
    [walletModal]
  );

  const requestSignIn = useCallback(() => {
    router.push("/signin");
  }, [router]);

  const logOut = useCallback(async () => {
    if (!near) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    wallet.signOut();
    near.accountId = null;
    setSignedIn(false);
    setSignedAccountId(null);
    resetSegment();
    localStorage.removeItem("accountId");
  }, [near]);

  const refreshAllowance = useCallback(async () => {
    alert(
      "You're out of access key allowance. Need sign in again to refresh it"
    );
    await logOut();
    requestSignIn();
  }, [logOut, requestSignIn]);

  useEffect(() => {
    if (!near) {
      return;
    }
    setSignedIn(!!accountId);
    setSignedAccountId(accountId);
  }, [near, accountId]);

  useEffect(() => {
    setAvailableStorage(
      account.storageBalance
        ? Big(account.storageBalance.available).div(utils.StorageCostPerByte)
        : Big(0)
    );
  }, [account]);

  useEffect(() => {
    if (navigator.userAgent !== "ReactSnap") {
      const pageFlashPrevent = document.getElementById("page-flash-prevent");
      if (pageFlashPrevent) {
        pageFlashPrevent.remove();
      }
    }
  }, []);

  useEffect(() => {
    updateAuthStore({
      accountId: signedAccountId,
      availableStorage,
      logOut,
      refreshAllowance,
      requestSignIn,
      requestSignInWithWallet,
      signedIn,
    });
  });

  const passProps = {
    // accountId: signedAccountId,
    // availableStorage,
    // logOut,
    // refreshAllowance,
    // requestSignIn,
    // requestSignInWithWallet,
    // signedIn,

    // hooks:
    widgets: Widgets,
    tos: {
      checkComponentPath: Widgets.tosCheck,
      contentComponentPath: Widgets.tosContent,
    },
    flags,
    setFlags,
    iframeRoutes,

    widgetSrc,
    setWidgetSrc,
  };

  return (
    <EthersProviderContext.Provider value={ethersProviderContext}>
      <Component {...pageProps} />

      <Toaster position="bottom-center" richColors />
    </EthersProviderContext.Provider>
  );
}
