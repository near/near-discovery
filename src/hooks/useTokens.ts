import { useCallback, useContext, useEffect, useState } from 'react';

import NearIconSvg from '@/components/sidebar-navigation/icons/near-icon.svg';
import { NearContext } from '@/components/WalletSelector';
import whiteList from '@/utils/white-list.json';

export interface FastNearFT {
  account_id: string;
  tokens: TokenFastNear[];
}

export interface TokenFastNear {
  balance: string;
  contract_id: string;
  last_update_block_height: number;
}

export const accounts_ft = async (accountId: string): Promise<FastNearFT> => {
  const response = await fetch(`https://api.fastnear.com/v1/account/${accountId}/ft`);
  return (await response.json()) as FastNearFT;
};

export interface Token {
  contract_id: string;
  spec: string;
  name: string;
  symbol: string;
  icon: null | string;
  reference: null | string;
  reference_hash: string | null;
  decimals: number;
  tax_rate?: number;
  balance: string;
}

const useTokens = () => {
  const { wallet, signedAccountId } = useContext(NearContext);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTokens = useCallback(async () => {
    if (!wallet || !signedAccountId) return;

    setLoading(true);
    try {
      const res = await accounts_ft(signedAccountId);
      const tokensWithMetadata: Token[] = await Promise.all(
        res.tokens
          .filter((token) => token.balance !== '0')
          .map(async (token) => {
            let metadata = whiteList.find((item) => item.contract_id === token.contract_id);

            if (!metadata) {
              try {
                metadata = await wallet.viewMethod({ contractId: token.contract_id, method: 'ft_metadata' });
              } catch (error) {
                console.error(`Error fetching metadata for ${token.contract_id}:`, error);
              }
            }

            return {
              contract_id: token.contract_id,
              spec: (metadata && metadata.spec) || '1.0.0',
              name: (metadata && metadata.name) || '',
              symbol: (metadata && metadata.symbol) || '',
              icon: (metadata && metadata.icon) || null,
              reference: (metadata && metadata.reference) || null,
              reference_hash: (metadata && metadata.reference_hash) || null,
              decimals: (metadata && metadata.decimals) || 0,
              tax_rate: metadata?.tax_rate,
              balance: token.balance,
            };
          }),
      );

      const nearBalance = await wallet.getBalance(signedAccountId, false);
      tokensWithMetadata.unshift({
        contract_id: 'near',
        symbol: 'NEAR',
        icon: NearIconSvg,
        balance: nearBalance,
        decimals: 24,
        spec: '1.0.0',
        name: 'NEAR',
        reference: null,
        reference_hash: null,
      });

      setTokens(tokensWithMetadata);
    } catch (error) {
      console.error('Error fetching fungible tokens:', error);
    } finally {
      setLoading(false);
    }
  }, [wallet, signedAccountId]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return { tokens, loading, reloadTokens: fetchTokens };
};

export default useTokens;
