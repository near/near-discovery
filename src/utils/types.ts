import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<T = any> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type NetworkId = 'localnet' | 'testnet' | 'mainnet';

export type Network = {
  networkId: NetworkId;
  viewAccountId: string;
  nodeUrl: string;
  walletUrl: string;
  helperUrl: string;
};
