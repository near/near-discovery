import "error-polyfill";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "App.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NetworkId, Widgets } from "./data/widgets";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAccount, useInitNear, useNear, utils } from "near-social-vm";

import Big from "big.js";
import EditorPage from "./pages/EditorPage";
import EmbedPage from "./pages/EmbedPage";
import FlagsPage from "./pages/FlagsPage";
import { Helmet } from "react-helmet";
import NavigationWrapper from "./components/navigation/org/NavigationWrapper";
import NearOrgPage from "./pages/NearOrgPage";
import ViewPage from "./pages/ViewPage";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupSender } from "@near-wallet-selector/sender";
import { setupWalletSelector } from "@near-wallet-selector/core";
import styled from "styled-components";
import { useFlags } from "./utils/flags";

const StyledApp = styled.div`
  @media (max-width: 991px) {
    padding-bottom: 40px;
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

  const metaProps = {
    title: "NEAR",
    description: "Let's build decentralized experiences.",
  };

  return (
    <StyledApp className="App">
      <Helmet>
        <script src="https://unpkg.com/@phosphor-icons/web@2.0.3"></script>
      </Helmet>

      <div id="page-flash-prevent" />

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          {/* Near ORG BOS Component Pages: */}
          <Route path={"/"} exact={true}>
            <NearOrgPage
              {...passProps}
              src={Widgets.nearOrg.homePage}
              meta={{
                title:
                  "The OS for the open web. Near Protocol is the Blockchain Operating Sytem",
                description:
                  "Effortlessly create and distribute innovative decentralized apps, while helping build a more open web, with the NEAR Blockchain Operating System (BOS). The BOS makes it easy to use the tools you already know and love to build apps that engage users and create a more open web.",
              }}
            />
          </Route>
          <Route path={"/use"} exact={true}>
            <NearOrgPage
              {...passProps}
              src={Widgets.nearOrg.usePage}
              meta={{
                title: "Your first steps to becoming a Web3 citizen",
                description:
                  "How Web3 on NEAR empowers you. Regain ownership. Interact freely. Participate in fair economies.",
              }}
            />
          </Route>
          <Route path={"/horizon"} exact={true}>
            <NearOrgPage {...passProps} src={Widgets.horizon.homePage} />
          </Route>
          <Route path={"/ecosystem"} exact={true}>
            <NearOrgPage
              {...passProps}
              src={Widgets.nearOrg.ecosystemOverviewPage}
              meta={{
                title: "Near Protocol Ecosystem",
                description:
                  "Projects building on NEAR are at the center. The Ecosystem is supporting them with everything they need to succeed.	DAOs: A new way to organize, fund, and empower communities · Explore DAOs, participate or get funding · NEARWEEK · Human Guild · TenK DAO.",
              }}
            />
          </Route>
          <Route path={"/ecosystem/community"} exact={true}>
            <NearOrgPage
              {...passProps}
              src={Widgets.nearOrg.ecosystemCommunityPage}
              meta={{
                title: "Near Protocol Community",
                description:
                  "The NEAR community is a globally distributed home to innovators, developers and contributors supporting the protocol's platform, ecosystem.",
              }}
            />
          </Route>
          <Route path={"/ecosystem/get-funding"} exact={true}>
            <NearOrgPage
              {...passProps}
              src={Widgets.nearOrg.ecosystemGetFundingPage}
              meta={{
                title:
                  "Near Protocol Get Funding. Build the future.The NEAR ecosystem offers multiple funding options to support initiatives aimed at decentralizing, growing, and innovating on NEAR.",
                description:
                  "We've helped hundreds of projects and teams realize their ideas, and bring them to market via Ecosystem grants for projects and start-ups building in web 3.0. Accelerators and Incubators for projects and start-ups looking to join an incubator or accelerator. Community led DAOs are Decentralized communities that support the growth of the ecosystem. Regional Hubs - If a project is based in the following regions they should apply via their respective Regional Hub.",
              }}
            />
          </Route>
          <Route path={"/ecosystem/work-and-earn"} exact={true}>
            <NearOrgPage
              {...passProps}
              src={Widgets.nearOrg.ecosystemWorkAndEarnPage}
              meta={{
                title: "Near Protocol Work and Earn",
                description:
                  "Want to help improve the NEAR ecosystem? Join our bounties program. Collaborate with others in the community to solve problems and earn rewards. View Bounties.",
              }}
            />
          </Route>

          {/* Near ORG Iframe Pages: */}
          <Route path={"/events"} exact={true}>
            <NearOrgPage
              {...passProps}
              iframeSrc="https://pages.near.org/events"
            />
          </Route>
          <Route path={"/learn"} exact={true}>
            <NearOrgPage
              {...passProps}
              iframeSrc="https://pages.near.org/learn"
            />
          </Route>
          <Route path={"/about"} exact={true}>
            <NearOrgPage
              {...passProps}
              iframeSrc="https://pages.near.org/about"
            />
          </Route>
          <Route path={"/news"} exact={true}>
            <NearOrgPage
              {...passProps}
              iframeSrc="https://pages.near.org/about/press-center/"
            />
          </Route>

          {/* Discovery Pages: */}
          <Route path={"/flags"} exact={true}>
            <NavigationWrapper {...passProps} />
            <FlagsPage {...passProps} meta={metaProps} />
          </Route>
          <Route path={"/embed/:widgetSrc*"}>
            <EmbedPage {...passProps} meta={metaProps} />
          </Route>
          <Route path={["/edit/:widgetSrc*", "/sandbox/:widgetSrc*"]}>
            <NavigationWrapper {...passProps} />
            <EditorPage {...passProps} meta={metaProps} />
          </Route>
          <Route path={"/:widgetSrc*"}>
            <NavigationWrapper {...passProps} />
            <ViewPage {...passProps} meta={metaProps} />
          </Route>
        </Switch>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;