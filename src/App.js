import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import "error-polyfill";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import ViewPage from "./pages/ViewPage";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupModal } from "@near-wallet-selector/modal-ui";
import EmbedPage from "./pages/EmbedPage";
import { useAccount, useInitNear, useNear, utils } from "near-social-vm";
import Big from "big.js";
import { NavigationWrapper } from "./components/navigation/alpha/NavigationWrapper";
import { NetworkId, Widgets } from "./data/widgets";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import FlagsPage from "./pages/FlagsPage";
import { useFlags } from "./utils/flags";

const StyledApp = styled.div`
  @media (max-width: 991px) {
    padding-bottom: 40px;
  }
  .logo-link {
    display: flex;
    align-items: center;
    justify-content: center;

    :after {
      content: "alpha";
      background-color: #59e692;
      color: #101d46;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
      margin-left: 3px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      padding: 3px 6px;
    }

    :hover {
      text-decoration: none;
    }
  }
`;

export const refreshAllowanceObj = {};

function App(props) {
  const [connected, setConnected] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState(null);
  const [walletModal, setWalletModal] = useState(null);
  const [widgetSrc, setWidgetSrc] = useState(null);
  const [flags, setFlags] = useFlags();

  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const accountId = account.accountId;

  const location = window.location;

  useEffect(() => {
    initNear &&
      initNear({
        networkId: NetworkId,
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
      checkComponentPath: Widgets.tosCheck,
      contentComponentPath: Widgets.tosContent,
    },
    flags,
    setFlags,
  };

  return (
    <StyledApp className="App">
      <Helmet>
        <script src="https://unpkg.com/@phosphor-icons/web@2.0.3"></script>
      </Helmet>

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path={"/flags"}>
            <NavigationWrapper {...passProps} />
            <FlagsPage {...passProps} />
          </Route>
          <Route path={"/embed/:widgetSrc*"}>
            <EmbedPage {...passProps} />
          </Route>
          <Route path={"/edit/:widgetSrc*"}>
            <NavigationWrapper {...passProps} />
            <EditorPage {...passProps} />
          </Route>
          <Route path={"/:widgetSrc*"}>
            <NavigationWrapper {...passProps} />
            <ViewPage {...passProps} />
          </Route>
        </Switch>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;
