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
  tokens = res.tokens
})

async function getRoute(chain, targetChain, token, account, amount) {
  const chainTokenList = tokens[chain.chainId]

  const filterTokens = chainTokenList.filter((item: any) => item.symbol.toUpperCase() === token.symbol.toUpperCase())

  if (!filterTokens || filterTokens.length === 0) {
    return
  }

  const realToken = filterTokens[0]

  const _amount = utils.parseUnits(amount.toString(), realToken.decimals)

  const routeRequest: RoutesRequest = {
    fromChainId: chain.chainId,
    fromAmount: _amount.toString(),
    fromTokenAddress: realToken.address,
    fromAddress: account,
    toChainId: targetChain.chainId,
    toTokenAddress: realToken.address,
    toAddress: account,
  }

  const res = await lifi.getRoutes(routeRequest)

  console.log('res: ', res)

  if (!res.routes || res.routes.length === 0) {
    return
  }

  console.log('res.routes[0]: ', res.routes[0])
  return res.routes[0]
}

export default function useLifi() {
  const { account, provider } = useAccount();
  const [fee, setFee] = useState();


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
    if (!targetToken || !chain || !targetChain || !amount) return;
    return getRoute(chain, targetChain, token, account, amount)
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
    const selectRoute = await getRoute(chain, targetChain, token, account, amount);
    const executeRes = await lifi.executeRoute(signer, selectRoute);
    console.log(executeRes)
    onSuccess(executeRes.id ? executeRes.id : '');
  };

  return {
    getQouteInfo,
    swap,
    gasCost: fee,
  };
}
