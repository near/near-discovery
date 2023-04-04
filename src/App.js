import React, { useCallback, useContext, useEffect, useState } from "react";
import "error-polyfill";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "App.scss";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga4";

import MyEditorPage from "./_/pages/editorPage/EditorPage";
import SearchPage from "./_/pages/SearchPage";
import HomePage from "./_/pages/HomePage";
import EmbedPage from "./_/pages/EmbedPage";
import DiscoverPage from "./_/pages/DiscoverPage";

// import { NavigationWrapper } from "./components/navigation/alpha/NavigationWrapper";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { useAccount, useInitNear, useNear, utils } from "near-social-vm";
import Big from "big.js";
import { EditorContext } from "./_/context/EditorContext";
import Footer from "./_/components/Footer";
import EnvironmentsPage from "./_/pages/EnvironmentsPage";

export const refreshAllowanceObj = {};
ReactGA.initialize("G-YJ2FL738R6");

export default function App(props) {
  const { NetworkId, Widgets } = useContext(EditorContext);

  const [connected, setConnected] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState(null);
  const [walletModal, setWalletModal] = useState(null);
  const [widgetSrc, setWidgetSrc] = useState(null);

  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const accountId = account.accountId;

  const location = window.location;

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  useEffect(() => {
    initNear &&
      initNear({
        networkId: localStorage.getItem("environment"),
      });
  }, [initNear, NetworkId]);

  useEffect(() => {
    if (
      !location.search.includes("?account_id") &&
      !location.search.includes("&account_id") &&
      (location.search || location.href.includes("/?#"))
    ) {
      window.history.replaceState({}, "/", "/" + location.hash);
    }
  }, [location]);

  useEffect(() => {
    if (!near) {
      return;
    }
    near.selector.then((selector) => {
      setWalletModal(
        setupModal(selector, { contractId: near.config.contractName })
      );
    });
  }, [near, NetworkId]);

  const requestSignIn = useCallback(
    (e) => {
      e && e.preventDefault();
      walletModal.show();
      return false;
    },
    [walletModal]
  );

  const logOut = useCallback(async () => {
    if (!near) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    wallet.signOut();
    near.accountId = null;
    setSignedIn(false);
    setSignedAccountId(null);
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
    widgets: Widgets,
    tos: {
      checkComponentPath: "adminalpha.near/widget/TosCheck",
      contentComponentPath: "adminalpha.near/widget/TosContent",
    },
  };

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path={"/components/:widgetSrc*"}>
            {/* <NavigationWrapper {...passProps} /> */}
            <EmbedPage {...passProps} />
          </Route>

          <Route path={"/profile"}>
            <SearchPage {...passProps} />
            <Footer />
          </Route>

          <Route path={"/environments"}>
            <EnvironmentsPage {...passProps} />
            <Footer />
          </Route>

          <Route path={"/search"}>
            <SearchPage {...passProps} />
            <Footer />
          </Route>

          <Route path={"/editor/:widgetSrc*"}>
            <MyEditorPage {...passProps} />
            <Footer />
          </Route>

          <Route path="/discover">
            <DiscoverPage {...passProps} />
            <Footer />
          </Route>

          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}
