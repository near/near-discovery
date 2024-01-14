import { useEffect, useState } from 'react';
import { lifi } from './useLifi'
import type { Token as LiFiToken, TokenAmount } from '@lifi/sdk'
import type { Token } from '../types';

import useAccount from '@/hooks/useAccount';

export default function useTokenBalance({
    tokensByChain,
}: {
    tokensByChain?: Token
}) {
    const [loading, setLoading] = useState<boolean>(false)
    const [balance, setBalance] = useState<string>('0') 
    const { account } = useAccount();

    useEffect(()=>{
        setLoading(true)
        if (account && tokensByChain && tokensByChain.address) {
            const lifiToken: LiFiToken = {
                symbol: tokensByChain.symbol,
                decimals: tokensByChain.decimals,
                name: tokensByChain.name ? tokensByChain.name : '',
                priceUSD: '',
                address: tokensByChain.address,
                chainId: tokensByChain.chainId,
            }

            lifi.getTokenBalancesForChains(account, {
                [lifiToken.chainId]: [lifiToken],
            })
            .then(res => {
                const vals: TokenAmount[] = res[tokensByChain.chainId]
                if (vals && vals.length) {
                    const amount = vals[0].amount
                    setBalance(amount)
                    setLoading(false)
                }
            })
            .catch(e => {
                setLoading(false)
                setBalance('0')
            })
        } else {
            setLoading(false)
            setBalance('0')
        }
        
    }, [tokensByChain])

    return { loading, balance }
}

export interface balance {
    symbol: string;
    amount: string;
    address: string;
}

export function useTokensBalance({ 
    tokensByChain,
}: {
    tokensByChain?: Token[];
}) {

    const defaultVals: balance[] = []
    const [loading, setLoading] = useState<boolean>(false)
    const [balances, setBalances] = useState<balance[]>(defaultVals) 
    const { account } = useAccount();

    useEffect(()=>{
        setLoading(true)
        setBalances(defaultVals)
        if (account && tokensByChain && tokensByChain.length) {
            const chainId = tokensByChain[0].chainId
            const lifiTokens: LiFiToken[] = tokensByChain.map(item => ({
                symbol: item.symbol,
                decimals: item.decimals,
                name: item.name ? item.name : '',
                priceUSD: '',
                address: item.address ? item.address : '',
                chainId: item.chainId,
            }))

            lifi.getTokenBalancesForChains(account, {
                [chainId]: lifiTokens,
            })
            .then(res => {
                const vals: TokenAmount[] = res[chainId]
                const amountBigThan0 = vals.filter(token => Number(token.amount) > 0)
                if (amountBigThan0 && amountBigThan0.length) {
                    setBalances(amountBigThan0.map(token => ({
                        symbol: token.symbol,
                        amount: token.amount,
                        address: token.address,
                    })))
                    
                } else {
                    setBalances(defaultVals)
                }
                setLoading(false)
            })
            .catch(e => {
                setLoading(false)
                setBalances(defaultVals)
            })
        } else {
            setLoading(false)
            setBalances(defaultVals)
        }
        
    }, [    tokensByChain,
    ])

    return { loading, balances }
}