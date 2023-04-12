import React, { useCallback, useContext, useEffect, useState } from "react";
import "error-polyfill";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "App.scss";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ReactGA from "react-ga4";

import MyEditorPage from "./_/pages/editorPage/EditorPage";
import MyBetaEditorPage from "./_/pages/editorPage/EditorPage.beta";
import SearchPage from "./_/pages/SearchPage";
import HomePage from "./_/pages/homePage/HomePage";
import EmbedPage from "./_/pages/EmbedPage";
import DiscoverPage from "./_/pages/DiscoverPage";
import ProfilePage from "./_/pages/ProfilePage";
import LearnPage from "./_/pages/learnPage/LearnPage";
import ChatPage from "./_/pages/ChatPage";
import AuthPage from "./_/pages/AuthPage";

// import { NavigationWrapper } from "./components/navigation/alpha/NavigationWrapper";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { useAccount, useInitNear, useNear, utils } from "near-social-vm";
import Big from "big.js";
import { EditorContext } from "./_/context/EditorContext";
import Footer from "./_/components/Footer";
import { Box, GlobalStyles } from "@mui/material";
import { ThemeContext } from "./_/context/ThemeContext";
import PagesContainer from "./_/components/PagesContainer";
import LoginDialog from "./_/dialogs/LoginDialog";
import LearnContextProvider from "./_/context/LearnContext";

export const refreshAllowanceObj = {};
ReactGA.initialize("G-YJ2FL738R6");

export default function App() {
  const { theme } = useContext(ThemeContext);
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
    <Box className="App">
      <GlobalStyles
        styles={{
          "*::-webkit-scrollbar": {
            width: 7,
          },
          "*::-webkit-scrollbar-track": {
            boxShadow: "none",
            backgroundColor: theme.borderColor + "11",
            borderEadius: 4,
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: theme.borderColor,
            borderRadius: 1,
          },
        }}
      />

      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path={"/components/:widgetSrc*"}>
            {/* <NavigationWrapper {...passProps} /> */}
            <EmbedPage {...passProps} />
          </Route>

          <Route path={"/auth"}>
            <AuthPage {...passProps} />{" "}
          </Route>

          <Route path={"/profile"}>
            <ProfilePage {...passProps} />
            <Footer />
          </Route>

          <Route path={"/settings"}>
            <EmptyPage {...passProps} />
            <Footer />
          </Route>

          <Route path={"/notifications"}>
            <EmptyPage {...passProps} />
            <Footer />
          </Route>

          <Route path={"/learn"}>
            <LearnContextProvider>
              <LearnPage {...passProps} />
            </LearnContextProvider>
            <Footer />
          </Route>

          <Route path={"/chat"}>
            <ChatPage {...passProps} />
            <Footer />
          </Route>

          <Route path={"/changeNetwork"}>
            <EmptyPage {...passProps} />
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

          <Route path={"/editorBeta/:widgetSrc*"}>
            <MyBetaEditorPage {...passProps} />
            <Footer />
          </Route>

          <Route path="/discover">
            <DiscoverPage {...passProps} />
            <Footer />
          </Route>

          <Route path="/:widgetSrc*">
            {/* <ViewPage {...passProps} /> */}
            <HomePage {...passProps} />
          </Route>

          {/* <Route path="/" component={HomePage} /> */}
        </Switch>
        <LoginDialog />
      </Router>
    </Box>
  );
}

const EmptyPage = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <PagesContainer {...props}>
      <Box
        sx={{
          wdith: "100%",
          display: "flex",
          justifyContent: "center",
          height: "calc(100vh - 25px)",
          overflowY: "auto",
          backgroundColor: theme.ui,
        }}
      >
        <Box
          sx={{
            maxWidth: 1250,
            width: "100%",
            my: 4,
            mb: 2,
            px: 2,
          }}
        >
          <Box
            sx={{
              minHeight: 700,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              width="200"
              height="200"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0528 1.01528L11.8722 7.22222C11.8127 7.31161 11.7875 7.41954 11.8014 7.52604C11.8153 7.63254 11.8673 7.73042 11.9477 7.80156C12.0282 7.87271 12.1317 7.91231 12.2391 7.91305C12.3465 7.91378 12.4505 7.87559 12.5319 7.80556L16.6472 4.23611C16.6713 4.21453 16.7012 4.20045 16.7332 4.19557C16.7652 4.19068 16.7979 4.19522 16.8274 4.20862C16.8568 4.22203 16.8817 4.24371 16.8991 4.27104C16.9164 4.29836 16.9254 4.33014 16.925 4.3625V15.5375C16.925 15.5717 16.9144 15.6051 16.8948 15.6331C16.8752 15.6611 16.8474 15.6824 16.8152 15.6941C16.7831 15.7058 16.7481 15.7073 16.7151 15.6984C16.682 15.6895 16.6525 15.6707 16.6306 15.6444L4.19167 0.754167C3.99159 0.51791 3.74246 0.328063 3.4616 0.197824C3.18073 0.067585 2.87487 7.92977e-05 2.56528 7.36094e-08H2.13056C1.5655 7.36094e-08 1.02358 0.224469 0.624025 0.624025C0.224468 1.02358 0 1.5655 0 2.13056V17.8694C0 18.4345 0.224468 18.9764 0.624025 19.376C1.02358 19.7755 1.5655 20 2.13056 20C2.49488 20.0001 2.85316 19.9068 3.17119 19.7291C3.48922 19.5513 3.7564 19.2951 3.94722 18.9847L8.12778 12.7778C8.18732 12.6884 8.21248 12.5805 8.1986 12.474C8.18472 12.3675 8.13274 12.2696 8.05228 12.1984C7.97182 12.1273 7.86832 12.0877 7.76092 12.087C7.65352 12.0862 7.54948 12.1244 7.46806 12.1944L3.35278 15.7639C3.32866 15.7855 3.29878 15.7996 3.26679 15.8044C3.2348 15.8093 3.20208 15.8048 3.17263 15.7914C3.14317 15.778 3.11826 15.7563 3.10092 15.729C3.08358 15.7016 3.07458 15.6699 3.075 15.6375V4.45972C3.07501 4.42551 3.08555 4.39213 3.10519 4.36412C3.12483 4.3361 3.15261 4.31481 3.18477 4.30313C3.21693 4.29145 3.2519 4.28995 3.28494 4.29883C3.31797 4.30772 3.34748 4.32655 3.36944 4.35278L15.8069 19.2458C16.007 19.4821 16.2562 19.6719 16.537 19.8022C16.8179 19.9324 17.1237 19.9999 17.4333 20H17.8681C18.148 20.0002 18.4252 19.9452 18.6838 19.8382C18.9425 19.7312 19.1775 19.5743 19.3755 19.3765C19.5735 19.1786 19.7305 18.9437 19.8377 18.6851C19.9448 18.4265 20 18.1494 20 17.8694V2.13056C20 1.5655 19.7755 1.02358 19.376 0.624025C18.9764 0.224469 18.4345 7.36094e-08 17.8694 7.36094e-08C17.5051 -9.56524e-05 17.1468 0.093176 16.8288 0.270914C16.5108 0.448651 16.2436 0.704924 16.0528 1.01528Z"
                fill={
                  theme.name === "dark"
                    ? "rgba(255,255,255,.075)"
                    : "rgba(0,0,0,.075)"
                }
              ></path>
            </svg>
          </Box>
        </Box>
      </Box>
    </PagesContainer>
  );
};
