const TestnetDomains = {
  "test.near.org": true,
  "127.0.0.1": true,
  "localhost": true
};

export const NetworkId =
  window.location.hostname in TestnetDomains ? "testnet" : "mainnet";
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
  globalSearchPage: "one.testnet/widget/GlobalSearchPage",
  notificationButton: "one.testnet/widget/NotificationButton",
  profilePage: "one.testnet/widget/ProfilePage",
  componentSummary: "one.testnet/widget/ComponentSummary",
  notificationsPage: "one.testnet/widget/NotificationsPage",
  tosCheck: "one.testnet/widget/TosCheck",
  tosContent: "one.testnet/widget/TosContent",
  wrapper: "one.testnet/widget/DIG.Theme",
  wrapper: "one.testnet/widget/DIG.Theme",
};

const MainnetWidgets = {
  image: "mob.near/widget/Image",
  default: "near/widget/NearOrg.HomePage",
  viewSource: "mob.near/widget/WidgetSource",
  widgetMetadataEditor: "mob.near/widget/WidgetMetadataEditor",
  widgetMetadata: "mob.near/widget/WidgetMetadata",
  profileImage: "mob.near/widget/ProfileImage",
  profileName: "patrick.near/widget/ProfileName",
  editorComponentSearch: "mob.near/widget/Editor.ComponentSearch",
  profileInlineBlock: "mob.near/widget/Profile.InlineBlock",
  componentsPage: "near/widget/ComponentsPage",
  peoplePage: "near/widget/PeoplePage",
  globalSearchPage: "chaotictempest.near/widget/Search",
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
};

export const Widgets =
  NetworkId === "testnet" ? TestnetWidgets : MainnetWidgets;
