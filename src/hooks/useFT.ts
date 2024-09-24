import { NearContext } from "@/components/WalletSelector";
import { useContext, useEffect, useState, useCallback } from "react";
import whiteList from '@/utils/white-list.json';
import NearIconSvg from '@/components/sidebar-navigation/icons/near-icon.svg';

export const accounts_ft = async (accountId: string) => {
    const response = await fetch(`https://api.fastnear.com/v1/account/${accountId}/ft`);
    return await response.json();
};

const useTokens = () => {
    const { wallet, signedAccountId } = useContext(NearContext);
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTokens = useCallback(async () => {
        if (!wallet || !signedAccountId) return;

        setLoading(true);
        try {
            const res = await accounts_ft(signedAccountId);
            let tokensWithMetadata = await Promise.all(
                res.tokens
                    .filter(token => token.balance !== '0')
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
                            ...metadata,
                            contract_id: token.contract_id,
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
            });

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

export default useTokens;