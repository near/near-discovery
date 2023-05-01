import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "bootstrap-icons/font/bootstrap-icons.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "App.scss";

import { NetworkId, signInContractId, Widgets } from "@/data/widgets";
import React, { useCallback, useEffect, useState } from "react";

import AuthCallbackHandler from "./pages/AuthCallbackHandler";
import Big from "big.js";
import CreateAccount from "./pages/CreateAccount";
import EditorPage from "./pages/EditorPage";
import EmbedPage from "./pages/EmbedPage";
import FlagsPage from "./pages/FlagsPage";
import { Helmet } from "react-helmet";
import NavigationWrapper from "./components/navigation/org/NavigationWrapper";
import NearOrgPage from "./pages/NearOrgPage";
import SignIn from "./pages/SignIn";
import { Toaster } from "sonner";
import VerifyEmail from "./pages/VerifyEmail";
import ViewPage from "./pages/ViewPage";
import { setupFastAuth } from "./lib/selector/setup";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupSender } from "@near-wallet-selector/sender";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { EthersProviderContext } from "near-social-vm";
import { useEthersProviderContext } from "@/data/web3";

const refreshAllowanceObj = {};

export default function App({ Component, pageProps }: AppProps) {
  const [connected, setConnected] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState(null);
  const [walletModal, setWalletModal] = useState(null);
  const [widgetSrc, setWidgetSrc] = useState(null);
  const [flags, setFlags] = useFlags();
  const ethersProviderContext = useEthersProviderContext();

  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const accountId = account.accountId;
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
            }),
            setupKeypom({
              trialBaseUrl:
                NetworkId == "testnet"
                  ? "https://test.near.org/#trial-url/"
                  : "https://near.org/#trial-url/",
              networkId: NetworkId,
              trialSplitDelim: "/",
              signInContractId,
              modalOptions: KEYPOM_OPTIONS(NetworkId),
            }),
          ],
        }),
      });
  }, [initNear]);

  useEffect(() => {
    if (!near) {
      return;
    }
    near.selector.then((selector) => {
      setWalletModal(
        setupModal(selector, { contractId: near.config.contractName })
      );
    });
  }, [near]);

  const requestSignInWithWallet = useCallback(
    (e) => {
      e && e.preventDefault();
      walletModal.show();
      return false;
    },
    [walletModal]
  );

  const requestSignIn = () => {
    window.location.href = "/signin";
  };

  const logOut = useCallback(async () => {
    if (!near) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    wallet.signOut();
    near.accountId = null;
    setSignedIn(false);
    setSignedAccountId(null);
    reset();
    localStorage.removeItem("accountId");
  }, [near]);

  const refreshAllowance = useCallback(async () => {
    alert(
      "You're out of access key allowance. Need sign in again to refresh it"
    );
    await logOut();
    requestSignIn();
  }, [logOut, requestSignIn]);
  refreshAllowanceObj.refreshAllowance = refreshAllowance;

  useEffect(() => {
    if (!near) {
      return;
    }
    setSignedIn(!!accountId);
    setSignedAccountId(accountId);
    setConnected(true);
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

  const passProps = {
    refreshAllowance: () => refreshAllowance(),
    setWidgetSrc,
    signedAccountId,
    signedIn,
    connected,
    availableStorage,
    widgetSrc,
    logOut,
    requestSignIn,
    requestSignInWithWallet,
    widgets: Widgets,
    tos: {
      checkComponentPath: Widgets.tosCheck,
      contentComponentPath: Widgets.tosContent,
    },
    flags,
    setFlags,
    iframeRoutes,
  };

  const ethersProviderContext = useEthersProviderContext();

  return (
    <EthersProviderContext.Provider value={ethersProviderContext}>
      <Component {...pageProps} />
    </EthersProviderContext.Provider>
  );
}
