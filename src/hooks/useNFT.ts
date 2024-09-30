import { useCallback, useContext, useEffect, useState } from 'react';

import { NearContext } from '@/components/WalletSelector';
import { Metadata, NFT } from '@/utils/types';

export interface Fastnear {
  account_id: string;
  tokens: Token[];
}

export interface Token {
  contract_id: string;
  last_update_block_height: number;
}

export interface NFTConsult {
  contract_id: string;
  token_id: string;
  owner_id: string;
  metadata: Metadata;
  approved_account_ids: string[];
}


export const accounts_nft = async (accountId: string): Promise<Fastnear> => {
  const response = await fetch(`https://api.fastnear.com/v1/account/${accountId}/nft`);
  return await response.json();
};

const useNFT = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [tokens, setTokens] = useState<NFT[][]>([]);

  const fetchTokens = useCallback(async () => {
    if (!wallet || !signedAccountId) return;

    const res = await accounts_nft(signedAccountId);

    const tokensWithMetadata = await Promise.all(
      res.tokens.map(async (token) => {
        try {
            const nfts = await wallet.viewMethod({
              contractId: token.contract_id,
              method: 'nft_tokens_for_owner',
              args: { account_id: signedAccountId },
            });

            return nfts.map((nft: NFTConsult): NFT => ({
              ...nft,
              contract_id: token.contract_id,
              approved_account_ids: Object.keys(nft.approved_account_ids),
            }));
        } catch (error) {
          console.error(`Error fetching NFTs for contract ${token.contract_id}:`, error);
          return [];
        }
      }),
    );

    setTokens(tokensWithMetadata.filter(tokens => tokens.length > 0));
  }, [wallet, signedAccountId]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return tokens;
};

export default useNFT;
