import Big from 'big.js';
import { Contract, providers, utils } from 'ethers';
import { ConnectionsRequest, LiFi, ChainType, QuoteRequest, RoutesRequest } from '@lifi/sdk'
import { useState } from 'react';

import { chainCofig } from '@/config/bridge';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import { usePriceStore } from '@/stores/price';

import type { Chain, Token } from '../types';
import { ExecException, ExecOptions } from 'child_process';

const { JsonRpcProvider } = providers;

// 初始化lifi
export const lifi = new LiFi({
  integrator: 'DapDap'
})

let tokens: any = {}
lifi.getTokens().then(res => {
  console.log(res)
  tokens = res.tokens
})


export default function useLifi() {
  const { account, provider } = useAccount();
  const [fee, setFee] = useState();
  const { addAction } = useAddAction('wallet/bridge');
  const priceStore = usePriceStore((store) => store.price);

  const getQouteInfo = async ({
    chain,
    token,
    targetChain,
    targetToken,
    amount,
  }: {
    chain: Chain;
    token: Token;
    targetChain: Chain;
    targetToken: Token;
    amount: string;
  }) => {
    if (!targetToken || !chain || !targetChain) return;

    const _amount = utils.parseUnits(amount, token.decimals);

    const routeRequest: RoutesRequest = {
      fromChainId: chain.chainId,
      fromAmount: _amount.toString(),
      fromTokenAddress: token.address as string,
      fromAddress: account,
      toChainId: targetChain.chainId,
      toTokenAddress: targetToken.address as string,
      toAddress: account,
    }

    const res = await lifi.getRoutes(routeRequest)

    if (!res.routes || res.routes.length === 0) {
      return
    }

    return res.routes[0]

  };

  const swap = async ({
    chain,
    token,
    targetChain,
    targetToken,
    amount,
    destination,
    onSuccess,
  }: {
    chain: Chain;
    token: Token;
    targetChain: Chain;
    targetToken: Token;
    amount: string;
    destination?: string;
    onSuccess: (hash: string) => void;
  }) => {
    if (!provider) return;
    const signer = await provider.getSigner(account);
    const _amount = utils.parseUnits(amount, token.decimals);

    const chainTokenList = tokens[chain.chainId]

    try {
      const filterTokens = chainTokenList.filter((item: any) => item.symbol.toUpperCase() === token.symbol.toUpperCase())

      if (filterTokens && filterTokens.length > 0) {
        const realToken = filterTokens[0]

        const routeRequest: RoutesRequest = {
          fromChainId: chain.chainId,
          fromAmount: _amount.toString(),
          fromTokenAddress: realToken.address as string,
          fromAddress: account,
          toChainId: targetChain.chainId,
          toTokenAddress: realToken.address as string,
          toAddress: destination ? destination : account,
        }

        const res = await lifi.getRoutes(routeRequest)
        if (!res.routes || res.routes.length === 0) {
          return
        }
        const selectRoute = res.routes[0]
        const res = await lifi.executeRoute(signer, selectRoute)
        onSuccess(res.tx ? res.tx : '')
      }
    } catch (e) {
      console.log(e)
    }
  };

  return {
    getQouteInfo,
    swap,
    gasCost: fee,
  };
}
