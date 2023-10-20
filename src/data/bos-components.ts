import type { NetworkId } from '@/utils/types';

type NetworkComponents = {
  applicationsPage: string;
  bosDirectory: string;
  componentSummary: string;
  componentsPage: string;
  default: string;
  digButton: string;
  editorComponentSearch: string;
  horizon: {
    homePage: string;
    appPage: string;
  };
  image: string;
  nearOrg: {
    cookiePolicy: string;
    ecosystemPage: string;
    ecosystemCommunityPage: string;
    ecosystemGetFundingPage: string;
    ecosystemOverviewPage: string;
    ecosystemWorkAndEarnPage: string;
    homePage: string;
    notifications: {
      page: string;
      alert: string;
      settings: string;
      button: string;
      iosHomeScreenAlert: string;
    };
    learnPage: string;
  };
  notificationButton: string;
  peoplePage: string;
  profileImage: string;
  profileInlineBlock: string;
  profileName: string;
  profilePage: string;
  search: {
    indexPage: string;
    typeAheadDropdown: string;
  };
  tosCheck: string;
  tosContent: string;
  viewSource: string;
  widgetMetadata: string;
  widgetMetadataEditor: string;
  wrapper: string;
};

export const componentsByNetworkId = ((): Record<NetworkId, NetworkComponents | undefined> => {
  const testnetTLA =
    process.env.NEXT_DISCOVERY_COMPONENTS_DEPLOYMENT_BRANCH === 'develop' ? 'discom-dev.testnet' : 'discom.testnet';

  return {
    testnet: {
      applicationsPage: `${testnetTLA}/widget/AppLibrary.IndexPage`,
      bosDirectory: 'one.testnet/widget/BOSDirectory',
      componentSummary: `${testnetTLA}/widget/ComponentSummary`,
      componentsPage: `${testnetTLA}/widget/ComponentsPage`,
      default: `${testnetTLA}/widget/ActivityPage`,
      digButton: `${testnetTLA}/widget/DIG.Button`,
      editorComponentSearch: 'one.testnet/widget/Editor.ComponentSearch',
      horizon: {
        homePage: 'nearhorizon.near/widget/HomePage',
        appPage: 'nearhorizon.near/widget/Index',
      },
      image: 'eugenethedream/widget/Image',
      nearOrg: {
        cookiePolicy: `${testnetTLA}/widget/NearOrg.CookiePolicy`,
        ecosystemPage: `${testnetTLA}/widget/NearOrg.EcosystemPage`,
        ecosystemCommunityPage: `${testnetTLA}/widget/NearOrg.Ecosystem.CommunityPage`,
        ecosystemGetFundingPage: `${testnetTLA}/widget/NearOrg.Ecosystem.GetFundingPage`,
        ecosystemOverviewPage: `${testnetTLA}/widget/NearOrg.Ecosystem.OverviewPage`,
        ecosystemWorkAndEarnPage: `${testnetTLA}/widget/NearOrg.Ecosystem.WorkAndEarnPage`,
        homePage: `${testnetTLA}/widget/NearOrg.HomePage`,
        notifications: {
          page: `${testnetTLA}/widget/NearOrg.Notifications.Notifications`,
          alert: `${testnetTLA}/widget/NearOrg.Notifications.NotificationAlert`,
          settings: `${testnetTLA}/widget/NearOrg.Notifications.Settings`,
          button: `${testnetTLA}/widget/NearOrg.Notifications.NotificationButton`,
          iosHomeScreenAlert: `${testnetTLA}/widget/NearOrg.Notifications.HomeScreenAlert`,
        },
        learnPage: `${testnetTLA}/widget/NearOrg.LearnPage`,
      },
      notificationButton: `${testnetTLA}/widget/NotificationButton`,
      peoplePage: `${testnetTLA}/widget/PeoplePage`,
      profileImage: 'eugenethedream/widget/ProfileImage',
      profileInlineBlock: 'eugenethedream/widget/Profile.InlineBlock',
      profileName: 'eugenethedream/widget/ProfileName',
      profilePage: `${testnetTLA}/widget/ProfilePage`,
      search: {
        indexPage: `${testnetTLA}/widget/Search.IndexPage`,
        typeAheadDropdown: `${testnetTLA}/widget/Search.TypeAheadDropdown`,
      },
      tosCheck: `${testnetTLA}/widget/TosCheck`,
      tosContent: `${testnetTLA}/widget/TosContent`,
      viewSource: 'eugenethedream/widget/WidgetSource',
      widgetMetadata: 'eugenethedream/widget/WidgetMetadata',
      widgetMetadataEditor: `${testnetTLA}/widget/WidgetMetadataEditor`,
      wrapper: `${testnetTLA}/widget/DIG.Theme`,
    },

    mainnet: {
      applicationsPage: 'near/widget/AppLibrary.IndexPage',
      bosDirectory: 'onboarder.near/widget/BOSDirectory',
      componentSummary: 'near/widget/ComponentSummary',
      componentsPage: 'near/widget/ComponentsPage',
      default: 'near/widget/ActivityPage',
      digButton: 'near/widget/DIG.Button',
      editorComponentSearch: 'mob.near/widget/Editor.ComponentSearch',
      horizon: {
        homePage: 'nearhorizon.near/widget/HomePage',
        appPage: 'nearhorizon.near/widget/Index',
      },
      image: 'mob.near/widget/Image',
      nearOrg: {
        cookiePolicy: 'near/widget/NearOrg.CookiePolicy',
        ecosystemPage: 'near/widget/NearOrg.EcosystemPage',
        ecosystemCommunityPage: 'near/widget/NearOrg.Ecosystem.CommunityPage',
        ecosystemGetFundingPage: 'near/widget/NearOrg.Ecosystem.GetFundingPage',
        ecosystemOverviewPage: 'near/widget/NearOrg.Ecosystem.OverviewPage',
        ecosystemWorkAndEarnPage: 'near/widget/NearOrg.Ecosystem.WorkAndEarnPage',
        homePage: 'near/widget/NearOrg.HomePage',
        notifications: {
          page: 'near/widget/NearOrg.Notifications.Notifications',
          alert: 'near/widget/NearOrg.Notifications.NotificationAlert',
          settings: 'near/widget/NearOrg.Notifications.Settings',
          button: 'near/widget/NearOrg.Notifications.NotificationButton',
          iosHomeScreenAlert: 'near/widget/NearOrg.Notifications.HomeScreenAlert',
        },
        learnPage: 'near/widget/NearOrg.LearnPage',
      },
      notificationButton: 'near/widget/NotificationButton',
      peoplePage: 'near/widget/PeoplePage',
      profileImage: 'mob.near/widget/ProfileImage',
      profileInlineBlock: 'mob.near/widget/Profile.InlineBlock',
      profileName: 'patrick.near/widget/ProfileName',
      profilePage: 'near/widget/ProfilePage',
      search: {
        indexPage: 'near/widget/Search.IndexPage',
        typeAheadDropdown: 'near/widget/Search.TypeAheadDropdown',
      },
      tosCheck: 'near/widget/TosCheck',
      tosContent: 'adminalpha.near/widget/TosContent',
      viewSource: 'mob.near/widget/WidgetSource',
      widgetMetadata: 'mob.near/widget/WidgetMetadata',
      widgetMetadataEditor: 'near/widget/WidgetMetadataEditor',
      wrapper: 'near/widget/DIG.Theme',
    },
  };
})();
