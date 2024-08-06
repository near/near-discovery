import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<T = any> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type NetworkId = ProductionNetwork['networkId'];
export type Network = ProductionNetwork;
// export type NetworkId = ProductionNetwork['networkId'] | DevelopmentNetwork['networkId'];
// export type Network = ProductionNetwork | DevelopmentNetwork;

type ProductionNetwork = {
  networkId: 'testnet' | 'mainnet';
  viewAccountId: string;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
  fastAuth: {
    mpcRecoveryUrl: string;
    authHelperUrl: string; // TODO refactor: review by fastauth team
    accountIdSuffix: string;
    firebase: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId: string;
    };
  };
};

export interface TosData {
  agreementsForUser: UserTosAgreement[];
  latestTosVersion: number;
}

type UserTosAgreement = {
  accountId: string;
  blockHeight: number;
  value: number;
};

export type IdosUser = {
  humanId?: string;
  address?: string;
  publicKey?: string;
};

export type IdosWalletInfo = {
  address: string;
  human_id: string;
  id: string;
  message: string;
  public_key: string;
  signature: string;
};

export type NotificationSubscriptionData = {
  subscription: PushSubscription;
  accountId: string;
  gateway: string;
};

export type NotificationLocalStorageByAccountId = {
  isNotificationSupported?: boolean;
  isPushManagerSupported?: boolean;
  isPermisionGranted?: boolean;
  notNowTS?: number;
  showOnTS?: number;
  permission?: boolean;
  subscribeStarted?: boolean;
  subscribeError?: string;
  bannerNotNowTS?: number;
};

export interface NotificationLocalStorage {
  [accountId: string]: NotificationLocalStorageByAccountId;
}

export type NotificationLocalStorageFull = NotificationLocalStorage & NotificationLocalStorageByAccountId;

// type DevelopmentNetwork = {
//   networkId: 'localnet';
//   viewAccountId: string;
//   nodeUrl: string;
//   walletUrl: string;
//   helperUrl: string;
// };

export type GoogleCalendarResponse = {
  kind: string;
  etag: string;
  summary: string;
  description: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: any[];
  nextPageToken: string;
  items: GoogleEventItem[];
};

export type GoogleEventItem = {
  id: string;
  htmlLink: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  attachments?: any[];
};

export type GoogleEventsListData = {
  items: GoogleEventItem[];
  nextPageToken: string;
};

export type LumaEventItem = {
  api_id: string;
  event: {
    api_id: string;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    cover_url: string;
    url: string;
    geo_address_json: any;
    geo_address_info?: any;
  };
};

export type LumaEventsListData = {
  entries: LumaEventItem[];
  hasMore: boolean;
};

export type FormatedEvent = {
  id: string;
  url: string;
  title: string;
  start: string;
  thumbnail: string;
  location?: string;
};
