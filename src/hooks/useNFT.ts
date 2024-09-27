import { useCallback, useContext, useEffect, useState } from 'react';

import { NearContext } from '@/components/WalletSelector';

export interface Fastnear {
  account_id: string;
  tokens: Token[];
}

export interface Token {
  contract_id: string;
  last_update_block_height: number;
}

export interface NFT {
  token_id: string;
  owner_id: string;
  metadata: Metadata;
  approved_account_ids: string[];
}

export interface Metadata {
  title: string;
  description: string | null;
  media: string | null;
  media_hash: string | null;
  copies: string | null;
  issued_at: string | null;
  expires_at: string | null;
  starts_at: string | null;
  updated_at: string | null;
  extra: string | null;
  reference: string | null;
  reference_hash: string | null;
}

export interface NFTInfo {
  origin: string;
  nfts: NFT[];
}

export const accounts_nft = async (accountId: string): Promise<Fastnear> => {
  const response = await fetch(`https://api.fastnear.com/v1/account/${accountId}/nft`);
  return await response.json();
};

const useNFT = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [tokens, setTokens] = useState<NFTInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTokens = useCallback(async () => {
    if (!wallet || !signedAccountId) return;

    setLoading(true);
    try {
      const res = await accounts_nft(signedAccountId);
      const tokensWithMetadata = await Promise.all(
        res.tokens.map(async (token) => {
          try {
            const nfts = await wallet.viewMethod({
              contractId: token.contract_id,
              method: 'nft_tokens_for_owner',
              args: { account_id: signedAccountId },
            });

            return {
              origin: token.contract_id,
              nfts: nfts,
            };
          } catch (error) {
            console.error(`Error fetching NFTs for contract ${token.contract_id}:`, error);
            return {
              origin: token.contract_id,
              nfts: [],
            };
          }
        }),
      );
      setTokens(tokensWithMetadata.filter((token) => token.nfts.length > 0));
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

export default useNFT;
