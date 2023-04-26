import React, { useCallback, useEffect, useState } from "react";
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
import {
  useAccount,
  useInitNear,
  useNear,
  utils,
  EthersProviderContext,
} from "near-social-vm";
import Big from "big.js";
import NavigationWrapper from "./components/navigation/org/NavigationWrapper";
import { NetworkId, Widgets } from "./data/widgets";
import { useEthersProviderContext } from "./data/web3";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import NearOrgPage from "./pages/NearOrgPage";
import FlagsPage from "./pages/FlagsPage";
import { useFlags } from "./utils/flags";
import {
  init as initializeSegment,
  recordWalletConnect,
  reset,
} from "./utils/analytics";
import { setupKeypom } from "keypom-js";
import { KEYPOM_OPTIONS } from "./utils/keypom-options";

const StyledApp = styled.div`
  @media (max-width: 991px) {
    padding-bottom: 40px;
  }
`;

export const refreshAllowanceObj = {};

const iframeRoutes = [
  {
    route: "/about/:subpath*",
    url: "https://pages.near.org/about",
  },
  {
    route: "/activate",
    url: "https://pages.near.org/activate",
  },
  {
    route: "/blog/:subpath*",
    url: "https://pages.near.org/blog",
  },
  {
    route: "/brand",
    url: "https://pages.near.org/brand",
  },
  {
    route: "/bridge",
    url: "https://pages.near.org/bridge",
  },
  {
    route: "/case-studies",
    url: "https://pages.near.org/case-studies",
  },
  {
    route: "/community-calendly",
    url: "https://pages.near.org/community-calendly",
  },
  {
    route: "/defi",
    url: "https://pages.near.org/defi",
  },
  {
    route: "/developers/:subpath*",
    url: "https://pages.near.org/developers",
  },
  {
    route: "/ecosystem/:subpath*",
    url: "https://pages.near.org/ecosystem",
  },
  {
    route: "/educate-old",
    url: "https://pages.near.org/educate-old",
  },
  {
    route: "/education",
    url: "https://pages.near.org/education",
  },
  {
    route: "/events",
    url: "https://pages.near.org/events",
  },
  {
    route: "/examples",
    url: "https://pages.near.org/examples",
  },
  {
    route: "/learn/:subpath*",
    url: "https://pages.near.org/learn",
  },
  {
    route: "/lisbon",
    url: "https://pages.near.org/lisbon",
  },
  {
    route: "/meetings",
    url: "https://pages.near.org/meetings",
  },
  {
    route: "/metabuild",
    url: "https://pages.near.org/metabuild",
  },
  {
    route: "/miami",
    url: "https://pages.near.org/miami",
  },
  {
    route: "/nbx22-showcase",
    url: "https://pages.near.org/nbx22-showcase",
  },
  {
    route: "/near-developer-program-terms-conditions",
    url: "https://pages.near.org/near-developer-program-terms-conditions",
  },
  {
    route: "/nearconpitchfest",
    url: "https://pages.near.org/nearconpitchfest",
  },
  {
    route: "/news",
    url: "https://pages.near.org/about/press-center",
  },
  {
    route: "/newsletter-thank-you",
    url: "https://pages.near.org/newsletter-thank-you",
  },
  {
    route: "/nyc",
    url: "https://pages.near.org/nyc",
  },
  {
    route: "/owc",
    url: "https://pages.near.org/owc",
  },
  {
    route: "/papers/:subpath*",
    url: "https://pages.near.org/papers",
  },
  {
    route: "/pitch",
    url: "https://pages.near.org/pitch",
  },
  {
    route: "/privacy",
    url: "https://pages.near.org/privacy/",
  },
  {
    route: "/sailgpsf",
    url: "https://pages.near.org/sailgpsf",
  },
  {
    route: "/sf",
    url: "https://pages.near.org/sf",
  },
  {
    route: "/spill",
    url: "https://pages.near.org/spill",
  },
  {
    route: "/stakewars",
    url: "https://pages.near.org/stakewars",
  },
  {
    route: "/use-cases",
    url: "https://pages.near.org/use-cases",
  },
  {
    route: "/use/:subpath*",
    url: "https://pages.near.org/use",
  },
  {
    route: "/v3-developers",
    url: "https://pages.near.org/v3-developers",
  },
  {
    route: "/v3-use",
    url: "https://pages.near.org/v3-use",
  },
  {
    route: "/work-with-us",
    url: "https://pages.near.org/work-with-us",
  },
];
function App(props) {
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
            setupKeypom({
              trialBaseUrl:
                NetworkId == "testnet"
                  ? "https://test.near.org/#trial-url/"
                  : "https://near.org/#trial-url/",
              networkId: NetworkId,
              trialSplitDelim: "/",
              signInContractId:
                NetworkId == "testnet" ? "v1.social08.testnet" : "social.near",
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
    widgets: Widgets,
    tos: {
      checkComponentPath: Widgets.tosCheck,
      contentComponentPath: Widgets.tosContent,
    },
    flags,
    setFlags,
    iframeRoutes,
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

      <EthersProviderContext.Provider value={ethersProviderContext}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            {/* Near ORG BOS Component Pages: */}
            <Route path={"/"} exact={true}>
              {signedIn ? (
                <>
                  <NavigationWrapper {...passProps} />
                  <ViewPage {...passProps} meta={metaProps} />
                </>
              ) : (
                <NearOrgPage
                  {...passProps}
                  src={Widgets.nearOrg.homePage}
                  meta={{
                    title: "NEAR | The OS for an Open Web",
                    description:
                      "NEAR isn’t just a Layer 1 blockchain — it’s the Blockchain Operating System for an  Open Web. Create and discover decentralized apps, and help build the future of the web, today.",
                  }}
                />
              )}
            </Route>
            <Route path={"/use"} exact={true}>
              <NearOrgPage
                {...passProps}
                src={Widgets.nearOrg.usePage}
                meta={{
                  title: "NEAR | Get Started",
                  description:
                    "Set up your NEAR account and start exploring apps built on the Blockchain Operating System and NEAR Protocol.",
                }}
              />
            </Route>
            <Route path={"/horizon"} exact={true}>
              <NearOrgPage
                {...passProps}
                src={Widgets.horizon.homePage}
                meta={{
                  title: "Horizon",
                  description: "Discover NEAR Horizon",
                }}
              />
            </Route>
            <Route path={"/people"} exact={true}>
              <NearOrgPage
                {...passProps}
                src={Widgets.peoplePage}
                meta={{
                  title: "Connect with the NEAR community.",
                  description: "Become part of the NEAR community.",
                }}
              />
            </Route>
            <Route path={"/gateways"} exact={true}>
              <NearOrgPage
                {...passProps}
                src={Widgets.bosDirectory}
                meta={{
                  title: "BOS Viewer Directory",
                  description: "NEAR BOS Directory",
                }}
              />
            </Route>
            <Route path={"/components"} exact={true}>
              <NearOrgPage
                {...passProps}
                src={Widgets.componentsPage}
                defaultWidgetProps={{
                  tab: "all",
                }}
                meta={{
                  title: "Components built on the BOS",
                  description: "BOS Components",
                }}
              />
            </Route>
            <Route path={"/applications"} exact={true}>
              <NearOrgPage
                {...passProps}
                src={Widgets.componentsPage}
                defaultWidgetProps={{
                  tab: "apps",
                }}
                meta={{
                  title: "Applications built on the BOS",
                  description: "BOS Applications",
                }}
              />
            </Route>
            <Route path={"/horizon"} exact={true}>
              <NearOrgPage
                {...passProps}
                src={Widgets.horizon.appPage}
                meta={{
                  title: "Accelerate your Web3 Startup.",
                  description:
                    "Projects building on NEAR are at the center. The Ecosystem is supporting them with everything they need to succeed.	DAOs: A new way to organize, fund, and empower communities · Explore DAOs, participate or get funding · NEARWEEK · Human Guild · TenK DAO.",
                }}
              />
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
                  title: "NEAR | Join the Community",
                  description:
                    "The NEAR community is a globally distributed home to builders, founders, and contributors. Get started supporting the Blockchain Operating System and protocol’s ecosystem of applications and experiences.",
                }}
              />
            </Route>
            <Route path={"/ecosystem/get-funding"} exact={true}>
              <NearOrgPage
                {...passProps}
                src={Widgets.nearOrg.ecosystemGetFundingPage}
                meta={{
                  title: "NEAR | Get Funding",
                  description:
                    "Get funded while building on the Blockchain Operating System for an Open Web. The NEAR ecosystem offers multiple funding options to support initiatives aimed at decentralizing, growing, and innovating on NEAR.",
                }}
              />
            </Route>
            <Route path={"/ecosystem/work-and-earn"} exact={true}>
              <NearOrgPage
                {...passProps}
                src={Widgets.nearOrg.ecosystemWorkAndEarnPage}
                meta={{
                  title: "NEAR | Work and Earn",
                  description:
                    "Work and Earn across the NEAR ecosystem. Find a job, get a grant for your project, and earn bounties.",
                }}
              />
            </Route>
            {/* Near ORG Iframe Pages: */}
            {iframeRoutes.map((route) => (
              <Route key={route.route} path={route.route} exact={true}>
                <NearOrgPage {...passProps} iframeSrc={route.url} />
              </Route>
            ))}
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
            <Route path={"/onboarding/:widgetSrc*"}>
              <NavigationWrapper {...passProps} />
              <EditorPage {...passProps} meta={metaProps} onboarding={true} />
            </Route>
            <Route path={"/:widgetSrc*"}>
              <NavigationWrapper {...passProps} />
              <ViewPage {...passProps} meta={metaProps} />
            </Route>
          </Switch>
        </BrowserRouter>
      </EthersProviderContext.Provider>
    </StyledApp>
  );
}

export default App;
