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
    route: "/events",
    url: "https://pages.near.org/events",
  },
  {
    route: "/learn",
    url: "https://pages.near.org/learn",
  },
  {
    route: "/about",
    url: "https://pages.near.org/about",
  },
  {
    route: "/news",
    url: "https://pages.near.org/about/press-center",
  },
  {
    route: "/developers",
    url: "https://pages.near.org/developers",
  },
  {
    route: "/blog",
    url: "https://pages.near.org/blog",
  },
  {
    route: "/sailgpsf",
    url: "https://pages.near.org/sailgpsf"
  },
  {
    route: "/blog/open-call-for-near-accelerator-service-partners",
    url: "https://pages.near.org/blog/open-call-for-near-accelerator-service-partners"
  },
  {
    route: "/brand",
    url: "https://pages.near.org/brand"
  },
  {
    route: "/community-calendly",
    url: "https://pages.near.org/community-calendly"
  },
  {
    route: "/examples",
    url: "https://pages.near.org/examples"
  },
  {
    route: "/near-developer-program-terms-conditions",
    url: "https://pages.near.org/near-developer-program-terms-conditions"
  },
  {
    route: "/owc",
    url: "https://pages.near.org/owc"
  },
  {
    route: "/bridge",
    url: "https://pages.near.org/bridge"
  },
  {
    route: "/miami",
    url: "https://pages.near.org/miami"
  },
  {
    route: "/metabuild",
    url: "https://pages.near.org/metabuild"
  },
  {
    route: "/sf",
    url: "https://pages.near.org/sf"
  },
  {
    route: "/nyc",
    url: "https://pages.near.org/nyc"
  },
  {
    route: "/stakewars",
    url: "https://pages.near.org/stakewars"
  },
  {
    route: "/learn/learn-more-old/defi-2",
    url: "https://pages.near.org/learn/learn-more-old/defi-2"
  },
  {
    route: "/learn/learn-more-old/nfts",
    url: "https://pages.near.org/learn/learn-more-old/nfts"
  },
  {
    route: "/learn/learn-more-old/social-dao",
    url: "https://pages.near.org/learn/learn-more-old/social-dao"
  },
  {
    route: "/defi",
    url: "https://pages.near.org/defi"
  },
  {
    route: "/learn/learn-more-old/creator-economy",
    url: "https://pages.near.org/learn/learn-more-old/creator-economy/"
  },
  {
    route: "/developers/integration",
    url: "https://pages.near.org/developers/integration"
  },
  {
    route: "/about/foundation",
    url: "https://pages.near.org/about/foundation"
  },
  {
    route: "/activate",
    url: "https://pages.near.org/activate"
  },
  {
    route: "/ecosystem/work-and-earn/bounties",
    url: "https://pages.near.org/ecosystem/work-and-earn/bounties"
  },
  {
    route: "/about/careers",
    url: "https://pages.near.org/about/careers"
  },
  {
    route: "/case-studies",
    url: "https://pages.near.org/case-studies"
  },
  {
    route: "/ecosystem/community/wechat",
    url: "https://pages.near.org/ecosystem/community/wechat"
  },
  {
    route: "/educate-old",
    url: "https://pages.near.org/educate-old"
  },
  {
    route: "/education",
    url: "https://pages.near.org/education"
  },
  {
    route: "/use-cases",
    url: "https://pages.near.org/use-cases"
  },
  {
    route: "/about/contact-us",
    url: "https://pages.near.org/about/contact-us"
  },
  {
    route: "/developers/tools",
    url: "https://pages.near.org/developers/tools"
  },
  {
    route: "/developers/get-help",
    url: "https://pages.near.org/developers/get-help"
  },
  {
    route: "/developers/build-on-near",
    url: "https://pages.near.org/developers/build-on-near"
  },
  {
    route: "/ecosystem/work-and-earn",
    url: "https://pages.near.org/ecosystem/work-and-earn"
  },
  {
    route: "/newsletter-thank-you",
    url: "https://pages.near.org/newsletter-thank-you"
  },
  {
    route: "/privacy",
    url: "https://pages.near.org/privacy/"
  },
  {
    route: "/lisbon",
    url: "https://pages.near.org/lisbon"
  },
  {
    route: "/about/network",
    url: "https://pages.near.org/about/network"
  },
  {
    route: "/nearconpitchfest",
    url: "https://pages.near.org/nearconpitchfest"
  },
  {
    route: "/meetings",
    url: "https://pages.near.org/meetings"
  },
  {
    route: "/about/network/decentralize",
    url: "https://pages.near.org/about/network/decentralize"
  },
  {
    route: "/about/press-center",
    url: "https://pages.near.org/about/press-center"
  },
  {
    route: "/developers/governance",
    url: "https://pages.near.org/"
  },
  {
    route: "/nbx22-showcase",
    url: "https://pages.near.org/nbx22-showcase"
  },
  {
    route: "/learn/tools",
    url: "https://pages.near.org/learn/tools"
  },
  {
    route: "/use/set-up-account",
    url: "https://pages.near.org/use/set-up-account"
  },
  {
    route: "/ecosystem/community",
    url: "https://pages.near.org/ecosystem/community"
  },
  {
    route: "/spill",
    url: "https://pages.near.org/spill"
  },
  {
    route: "/ecosystem/get-funding",
    url: "https://pages.near.org/ecosystem/get-funding"
  },
  {
    route: "/learn/learn-more",
    url: "https://pages.near.org/learn/learn-more"
  },
  {
    route: "/v3-use",
    url: "https://pages.near.org/v3-use"
  },
  {
    route: "/v3-developers",
    url: "https://pages.near.org/v3-developers"
  },
  {
    route: "/developers",
    url: "https://pages.near.org/developers"
  },
  {
    route: "/ecosystem",
    url: "https://pages.near.org/ecosystem"
  },
  {
    route: "/about/brand",
    url: "https://pages.near.org/about/brand"
  },
  {
    route: "/use",
    url: "https://pages.near.org/use"
  },
  {
    route: "/about/network/validators",
    url: "https://pages.near.org/about/network/validators"
  },
  {
    route: "/work-with-us",
    url: "https://pages.near.org/work-with-us"
  },
  {
    route: "/developers/get-help/office-hours",
    url: "https://pages.near.org/developers/get-help/office-hours"
  },
  {
    route: "/pitch",
    url: "https://pages.near.org/pitch"
  },
  {
    route: "/learn",
    url: "https://pages.near.org/learn"
  },
  {
    route: "/about",
    url: "https://pages.near.org/about"
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
              trialBaseUrl: NetworkId == "testnet" ? "test.near.org/#trial-url#" : "near.org/#trial-url#", 
              networkId: NetworkId, 
              trialSplitDelim: "/",
              signInContractId: NetworkId == "testnet" ? "v1.social08.testnet" : "social.near",
              modalOptions: KEYPOM_OPTIONS(NetworkId)
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
            {/* <Route path={"/:widgetSrc*"}>
              <NavigationWrapper {...passProps} />
              <ViewPage {...passProps} meta={metaProps} />
            </Route> */}
          </Switch>
        </BrowserRouter>
      </EthersProviderContext.Provider>
    </StyledApp>
  );
}

export default App;
