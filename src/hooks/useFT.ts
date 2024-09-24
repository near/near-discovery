import { NearContext } from "@/components/WalletSelector";
import { useContext, useEffect, useState, useCallback } from "react";
import whiteList from '@/utils/white-list.json';

export const accounts_ft = async (accountId: string) => {
    const response = await fetch(`https://api.fastnear.com/v1/account/${accountId}/ft`);
    return await response.json();
};

const useFT = () => {
    const { wallet, signedAccountId } = useContext(NearContext);
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTokens = useCallback(async () => {
        if (!wallet || !signedAccountId) return;

        setLoading(true);
        try {
            const res = await accounts_ft(signedAccountId);
            const tokensWithMetadata = await Promise.all(
                res.tokens
                    .filter(token => token.balance !== '0')
                    .map(async (token) => {
                        const tokenVerified = whiteList.find((item) => item.contract_id === token.contract_id);
                        if (!tokenVerified) {
                            let metadata = {};
                            try {
                                metadata = await wallet.viewMethod({ contractId: token.contract_id, method: 'ft_metadata' });
                            } catch (error) {
                                console.error(`Error fetching metadata for ${token.contract_id}:`, error);
                            }
                            return {
                                ...metadata,
                                contract_id: token.contract_id,
                                balance: token.balance,
                                verified: false,
                            };
                        }
                        return {
                            ...tokenVerified,
                            balance: token.balance,
                            verified: true,
                        };
                    }),
            );
            setTokens(tokensWithMetadata);
        } catch (error) {
            console.error("Error fetching fungible tokens:", error);
        } finally {
            setLoading(false);
        }
    }, [wallet, signedAccountId]);

    useEffect(() => {
        fetchTokens();
    }, [fetchTokens]);

    return { tokens, loading, reloadTokens: fetchTokens };
};

export default useFT;