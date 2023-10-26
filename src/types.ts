interface BasicCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface Token {
  chainId: number;
  address?: string;
  name?: string;
  symbol: string;
  icon: string;
  decimals: number;
  isNative?: boolean;
}

export interface Chain {
  chainId: number;
  chainName: string;
  icon: string;
  nativeCurrency: BasicCurrency;
  rpcUrls: string[];
  blockExplorers: string;
}
