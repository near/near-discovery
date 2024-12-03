import type { Network, NetworkId } from './utils/types';

export const networks: Record<NetworkId, Network> = {
  mainnet: {
    networkId: 'mainnet',
    viewAccountId: 'near',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
    fastAuth: {
      mpcRecoveryUrl: 'https://mpc-recovery-leader-mainnet-cg7nolnlpa-ue.a.run.app',
      authHelperUrl: 'https://api.kitwallet.app',
      accountIdSuffix: 'near',
      firebase: {
        apiKey: 'AIzaSyDhxTQVeoWdnbpYTocBAABbLULGf6H5khQ',
        authDomain: 'near-fastauth-prod.firebaseapp.com',
        projectId: 'near-fastauth-prod',
        storageBucket: 'near-fastauth-prod.appspot.com',
        messagingSenderId: '829449955812',
        appId: '1:829449955812:web:532436aa35572be60abff1',
        measurementId: 'G-T2PPJ8QRYY',
      },
    },
    linkdrop: 'v2.keypom.near',
    apiNearBlocks: 'https://api.nearblocks.io',
    ftContract: 'tkn.primitives.near',
    nftContract: 'nft.primitives.near',
    fastNearApi: 'https://api.fastnear.com',
  },
  testnet: {
    networkId: 'testnet',
    viewAccountId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    fastAuth: {
      mpcRecoveryUrl: 'https://mpc-recovery-7tk2cmmtcq-ue.a.run.app',
      authHelperUrl: 'https://testnet-api.kitwallet.app',
      accountIdSuffix: 'testnet',
      firebase: {
        apiKey: 'AIzaSyDAh6lSSkEbpRekkGYdDM5jazV6IQnIZFU',
        authDomain: 'pagoda-oboarding-dev.firebaseapp.com',
        projectId: 'pagoda-oboarding-dev',
        storageBucket: 'pagoda-oboarding-dev.appspot.com',
        messagingSenderId: '116526963563',
        appId: '1:116526963563:web:053cb0c425bf514007ca2e',
        measurementId: 'G-HF2NBGE60S',
      },
    },
    linkdrop: 'v2.keypom.testnet',
    apiNearBlocks: 'https://api-testnet.nearblocks.io',
    ftContract: 'tkn.primitives.testnet',
    nftContract: 'nft.primitives.testnet',
    fastNearApi: 'https://test.api.fastnear.com',
  },

  // localnet: {
  //   // these are defined by https://github.com/kurtosis-tech/near-package
  //   networkId: 'localnet',
  //   viewAccountId: 'test.near',
  //   nodeUrl: 'http://127.0.0.1:8332',
  //   walletUrl: 'http://127.0.0.1:8334',
  //   helperUrl: 'http://127.0.0.1:8330',
  // },
};

// Chains for EVM Wallets
const evmWalletChains = {
  mainnet: {
    chainId: 397,
    name: 'Near Protocol',
    explorer: 'https://eth-explorer.near.org',
    rpc: 'https://eth-rpc.mainnet.near.org',
  },
  testnet: {
    chainId: 398,
    name: 'Near Testnet',
    explorer: 'https://eth-explorer-testnet.near.org',
    rpc: 'https://eth-rpc.testnet.near.org',
  },
};

export const networkId: NetworkId = (process.env.NEXT_PUBLIC_NETWORK_ID as NetworkId) || 'testnet';
export const network = networks[networkId];
export const signInContractId = networkId === 'testnet' ? 'v1.social08.testnet' : 'social.near';
export const termsDomainName = `${process.env.NEXT_PUBLIC_TOS_SUBDOMAIN_NAME}/ipfs/${process.env.NEXT_PUBLIC_TERMS_CID}`;
export const privacyDomainName = `${process.env.NEXT_PUBLIC_TOS_SUBDOMAIN_NAME}/ipfs/${process.env.NEXT_PUBLIC_PRIVACY_CID}`;
export const localStorageAccountIdKey = 'near-social-vm:v01::accountId:';
export const isLocalEnvironment = process.env.NEXT_PUBLIC_LOCAL_ENVIRONMENT === 'true';
export const sidebarLayoutEnabled = process.env.NEXT_PUBLIC_SIDEBAR_LAYOUT === 'true';
export const idosCreateAccountUrl = process.env.NEXT_PUBLIC_IDOS_CREATE_ACCOUNT_URL;
export const gleapSdkToken = process.env.NEXT_PUBLIC_GLEAP_SDK_TOKEN;
export const lumaApiUrl = process.env.NEXT_PUBLIC_LUMA_API_URL ?? '';
export const lumaNearCalendarId = process.env.NEXT_PUBLIC_LUMA_NEAR_CALENDAR_ID ?? '';
export const lumaNearAICalendarId = process.env.NEXT_PUBLIC_LUMA_NEAR_AI_CALENDAR_ID ?? '';
export const lumaNearHZNCalendarId = process.env.NEXT_PUBLIC_LUMA_NEAR_HZN_CALENDAR_ID ?? '';
export const lumaDevHubHacksCalendarId = process.env.NEXT_PUBLIC_LUMA_DEVHUB_HACKS_CALENDAR_ID ?? '';
export const nearTownHallCalendarId = process.env.NEXT_PUBLIC_NEAR_TOWN_HALL_CALENDAR_ID ?? '';
export const googleCalendarApiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY ?? '';
export const devhubCommunityCalendarId = process.env.NEXT_PUBLIC_DEVHUB_COMMUNITY_CALENDAR_ID ?? '';
export const mailchimpApiKey = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY ?? '';
export const mailchimpRegion = process.env.NEXT_PUBLIC_MAILCHIMP_REGION ?? '';
export const mailchimpAudienceId = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID ?? '';
export const EVMWalletChain = evmWalletChains[networkId];

export const commitModalBypassAuthorIds = (process.env.NEXT_PUBLIC_COMMIT_MODAL_BYPASS_AUTHOR_IDS ?? '')
  .split(',')
  .filter((item) => !!item);
export const commitModalBypassSources = (process.env.NEXT_PUBLIC_COMMIT_MODAL_BYPASS_SOURCES ?? '')
  .split(',')
  .filter((item) => !!item);
