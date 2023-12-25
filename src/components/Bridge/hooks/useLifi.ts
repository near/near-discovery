import Big from 'big.js';
import { Contract, providers, utils } from 'ethers';
import { LiFi } from '@lifi/sdk'
import type { RoutesRequest, Route } from '@lifi/sdk'
import { useState } from 'react';

import useAddAction from '@/hooks/useAddAction';
import useAccount from '@/hooks/useAccount';

import type { Chain, Token } from '../types';


export const ISSERVER = typeof window === "undefined";

// 初始化lifi
export const lifi = new LiFi({
  integrator: 'DapDap'
})

const lifiTokenKey = 'lifi-token'
let tokens: any = {}
getLifiTokens().then(res => tokens = res)

async function getLifiTokens() {
  if (!ISSERVER) {
    const tokensJSONString = window.sessionStorage.getItem(lifiTokenKey)
    if (tokensJSONString) {
      try {
        return JSON.parse(tokensJSONString)
      } catch (e) {
        console.log(e)
      }
    }
    const res = await lifi.getTokens()
    tokens = res.tokens
    window.sessionStorage.setItem(lifiTokenKey, JSON.stringify(tokens));
    return tokens
  }

  return []
}


async function getRoute(chain: Chain, targetChain: Chain, token: Token, account: string | undefined, amount: string, destination?: string): Promise<Route | undefined> {
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
    toAddress: destination ? destination : account,
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
  const { addAction } = useAddAction('wallet/bridge');


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
    const selectRoute: Route | undefined = await getRoute(chain, targetChain, token, account, amount, destination);
    if (selectRoute) {
      const tx = await lifi.executeRoute(signer, selectRoute);
      console.log(tx)
      onSuccess(tx.id ? tx.id : '');

      const bridgeTxs = localStorage.getItem('bridgeTxs') || '{}';
      const _bridgeTxs = JSON.parse(bridgeTxs);
      addAction({
        type: 'Bridge',
        fromChainId: chain.chainId,
        toChainId: targetChain.chainId,
        token,
        amount,
        template: 'Lifi Bridge',
        add: false,
        status: 1,
        transactionHash: tx.id,
      });
      _bridgeTxs[tx.id] = {
        amount,
        inputChain: chain.chainName,
        outputChain: targetChain.chainName,
        symbol: token.symbol,
        tx: tx.id,
        time: Date.now(),
        scan: chain.blockExplorers,
        isStargate: false,
        duration: '5 min',
      };
      localStorage.setItem('bridgeTxs', JSON.stringify(_bridgeTxs));
    }
  };

  return {
    getQouteInfo,
    swap,
    gasCost: fee,
  };
}
