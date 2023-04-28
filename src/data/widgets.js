const TestnetDomains = {
  "test.near.org": true,
  "127.0.0.1": true,
  localhost: true,
};

export const NetworkId =
  window.location.hostname in TestnetDomains ? "testnet" : "mainnet";
export const signInContractId =
  NetworkId === "testnet" ? "v1.social08.testnet" : "social.near";

export const networks = {
  mainnet: {
    networkId: "mainnet",
    viewAccountId: "near",
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
  },
  testnet: {
    networkId: "testnet",
    viewAccountId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
  },
  localnet: {
    networkId: "localnet",
    viewAccountId: "test.near",
  },
};

const TestnetWidgets = {
  image: "eugenethedream/widget/Image",
  default: "one.testnet/widget/ActivityPage",
  viewSource: "eugenethedream/widget/WidgetSource",
  widgetMetadataEditor: "eugenethedream/widget/WidgetMetadataEditor",
  widgetMetadata: "eugenethedream/widget/WidgetMetadata",
  profileImage: "eugenethedream/widget/ProfileImage",
  profilePage: "eugenethedream/widget/Profile",
  profileName: "eugenethedream/widget/ProfileName",
  componentsPage: "one.testnet/widget/ComponentsPage",
  peoplePage: "one.testnet/widget/PeoplePage",
  notificationButton: "one.testnet/widget/NotificationButton",
  componentSummary: "one.testnet/widget/ComponentSummary",
  notificationsPage: "one.testnet/widget/NotificationsPage",
  tosCheck: "one.testnet/widget/TosCheck",
  tosContent: "one.testnet/widget/TosContent",
  wrapper: "one.testnet/widget/DIG.Theme",
  nearOrg: {
    ecosystemCommunityPage:
      "discom.testnet/widget/NearOrg.Ecosystem.CommunityPage",
    ecosystemGetFundingPage:
      "discom.testnet/widget/NearOrg.Ecosystem.GetFundingPage",
    ecosystemOverviewPage:
      "discom.testnet/widget/NearOrg.Ecosystem.OverviewPage",
    ecosystemWorkAndEarnPage:
      "discom.testnet/widget/NearOrg.Ecosystem.WorkAndEarnPage",
    homePage: "discom.testnet/widget/NearOrg.HomePage",
    usePage: "discom.testnet/widget/NearOrg.UsePage",
  },
  horizon: {
    homePage: "nearhorizon.near/widget/HomePage",
    appPage: "nearhorizon.near/widget/Index",
  },
  search: {
    indexPage: "one.testnet/widget/Search.IndexPage",
    typeAheadDropdown: "one.testnet/widget/Search.TypeAheadDropdown",
  },
};

const MainnetWidgets = {
  image: "mob.near/widget/Image",
  default: "near/widget/ActivityPage",
  viewSource: "mob.near/widget/WidgetSource",
  widgetMetadataEditor: "near/widget/WidgetMetadataEditor",
  widgetMetadata: "mob.near/widget/WidgetMetadata",
  profileImage: "mob.near/widget/ProfileImage",
  profileName: "patrick.near/widget/ProfileName",
  editorComponentSearch: "mob.near/widget/Editor.ComponentSearch",
  profileInlineBlock: "mob.near/widget/Profile.InlineBlock",
  componentsPage: "near/widget/ComponentsPage",
  peoplePage: "near/widget/PeoplePage",
  notificationButton: "near/widget/NotificationButton",
  profilePage: "near/widget/ProfilePage",
  componentSummary: "near/widget/ComponentSummary",
  notificationsPage: "near/widget/NotificationsPage",
  tosCheck: "near/widget/TosCheck",
  tosContent: "adminalpha.near/widget/TosContent",
  wrapper: "near/widget/DIG.Theme",
  bosDirectory: "onboarder.near/widget/BOSDirectory",
  nearOrg: {
    ecosystemCommunityPage: "near/widget/NearOrg.Ecosystem.CommunityPage",
    ecosystemGetFundingPage: "near/widget/NearOrg.Ecosystem.GetFundingPage",
    ecosystemOverviewPage: "near/widget/NearOrg.Ecosystem.OverviewPage",
    ecosystemWorkAndEarnPage: "near/widget/NearOrg.Ecosystem.WorkAndEarnPage",
    homePage: "near/widget/NearOrg.HomePage",
    usePage: "near/widget/NearOrg.UsePage",
  },
  horizon: {
    homePage: "nearhorizon.near/widget/HomePage",
    appPage: "nearhorizon.near/widget/Index",
  },
  search: {
    indexPage: "near/widget/Search.IndexPage",
    typeAheadDropdown: "near/widget/Search.TypeAheadDropdown",
  },
};

export const Widgets =
  NetworkId === "testnet" ? TestnetWidgets : MainnetWidgets;
