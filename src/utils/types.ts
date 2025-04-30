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
  linkdrop: string;
  apiNearBlocks: string;
  ftContract: string;
  nftContract: string;
  daoContract: string;
  multisigContract: string;
  fastNearApi: string;
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

export interface Drops {
  drop_id: string;
  owner_id: string;
  deposit_per_use: string;
  simple: Simple;
  config: null;
  metadata: string;
  registered_uses: number;
  required_gas: string;
  next_key_id: number;
  keys?: Keys[];
}

export interface KeypomKey {
  drop_id: string;
  pk: string;
  cur_key_use: number;
  remaining_uses: number;
  last_used: number;
  allowance: number;
  key_id: number;
}

export interface Keys {
  public: string;
  private: string;
}
export interface Simple {
  lazy_register: null;
}
export type FT = {
  contract_id: string;
  balance: string;
  verified: boolean;
  metadata: {
    decimals: number;
    icon: string;
    name: string;
    symbol: string;
  };
};
export interface NFT {
  contract_id: string;
  token_id: string;
  owner_id?: string;
  metadata?: {
    title: string;
    description: string | null;
    media: string | null;
    copies: string | null;
    reference: string | null;
    base_uri: string | null;
  };
  approved_account_ids?: string[] | null;
}
export type DAO = {
  contract_id: string;
  public_name: string;
  description: string;
  metadata: {
    logo_url?: string | undefined;
    logo_data?: string | undefined;
    cover_url?: string | undefined;
  };
};

export type Collection = {
  [contract_id: string]: NFT[];
};
