import Big from 'big.js';
import { Contract, providers, utils } from 'ethers';
import { LiFi } from '@lifi/sdk'
import useLifiChainToken from '@/stores/lifi-chain-token';
import { chains as configChains } from '@/config/bridge';
import type { RoutesRequest, Route, Chain as LiFiChain, Token as LiFiToken, TokensResponse } from '@lifi/sdk'
import { useState } from 'react';

import useAddAction from '@/hooks/useAddAction';
import useAccount from '@/hooks/useAccount';

import type { Chain, Token, LifiChainToken } from '../types';

export const ISSERVER = typeof window === "undefined";

// 初始化lifi
export const lifi = new LiFi({
  integrator: 'DapDap'
})


const lifiTokenKey = 'lifi-token'
const lifiChainKey = 'lifi-chain'
let tokenLoaded = false
let chainLoaded = false
export const tokens: LifiChainToken = {}
export const chains: Chain[] = []
getLifiChains().then(res => {
  chains.push(...res)
  useLifiChainToken.setState({ chains })
  getLifiTokens().then(res => {
    Object.assign(tokens, res)
    useLifiChainToken.setState({ tokens })
  })
})


/**
 * 获取所有lifiToken
 * @returns LiFiToken[]
 */
export async function getLifiTokens(): Promise<LifiChainToken> {
  if (tokenLoaded) {
    return tokens
  }

  if (!ISSERVER) {
    const tokensJSONString = window.sessionStorage.getItem(lifiTokenKey)
    if (tokensJSONString) {
      try {
        return Promise.resolve(JSON.parse(tokensJSONString))
      } catch (e) {
        console.log(e)
      }
    }
    const res: TokensResponse = await lifi.getTokens()

    const resTokens: {
      [chainId: number]: Token[];
    }
     = {}

    Object.keys(res.tokens).forEach((chainId: string) => {
      const numChainId = Number(chainId)
      const tokenList = res.tokens[numChainId]

      const currentChain = configChains[numChainId]

      resTokens[numChainId] = tokenList.filter(item => !!item.logoURI).map(item => {
        return {
          chainId: item.chainId,
          address: item.address,
          name: item.name,
          symbol: item.symbol,
          icon: item.logoURI ? item.logoURI : '',
          decimals: item.decimals,
          // lifi和stragate不一致
          isNative: currentChain && currentChain.nativeCurrency.symbol === item.symbol,
          // isNative: false,
        }
      })
    })

    window.sessionStorage.setItem(lifiTokenKey, JSON.stringify(resTokens))
    tokenLoaded = true
    return resTokens
  }

  return []
}

/**
 * 获取所有lifi chain
 * @returns LiFiChain[]
 */
export async function getLifiChains():Promise<Chain[]> {
  if (chainLoaded) {
    return chains
  }

  if (!ISSERVER) {
    const chainJSONString = window.sessionStorage.getItem(lifiChainKey)
    if (chainJSONString) {
      try {
        return Promise.resolve(JSON.parse(chainJSONString))
      } catch (e) {
        console.log(e)
      }
    }
    const res: LiFiChain[] = await lifi.getChains()

    const realLifiChain: Chain[] = res.map((item: LiFiChain): Chain => {
      const { metamask, metamask: { nativeCurrency } } = item
      return {
        chainId: item.id,
        chainName: item.name,
        icon: item.logoURI ? item.logoURI : '',
        nativeCurrency: nativeCurrency,
        rpcUrls: metamask.rpcUrls,
        blockExplorers: metamask.blockExplorerUrls.length ? metamask.blockExplorerUrls[0]: '',
      }
    })

    window.sessionStorage.setItem(lifiChainKey, JSON.stringify(realLifiChain))
    chainLoaded = true
    return realLifiChain
  }
  return []
}

async function getRoute(
  chain: Chain,
  targetChain: Chain,
  token: Token,
  targetToken: Token,
  account: string | undefined,
  amount: string,
  destination?: string): Promise<Route[] | undefined> {

  const _amount = utils.parseUnits(amount.toString(), token.decimals)

  const routeRequest: RoutesRequest = {
    fromChainId: chain.chainId,
    fromAmount: _amount.toString(),
    fromTokenAddress: token.address ? token.address : '',
    fromAddress: account,
    toChainId: targetChain.chainId,
    toTokenAddress: targetToken.address ? targetToken.address : '',
    toAddress: destination ? destination : account,
  }

  const res = await lifi.getRoutes(routeRequest)

  if (!res.routes || res.routes.length === 0) {
    return
  }

  return res.routes
}

export function computeDuration(route:Route): string {
  let duration: number = 0
  route.steps.forEach(step => {
    duration += step.estimate.executionDuration
  })

  return Math.ceil(duration / 60) + ' min'
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
    destination,
  }: {
    chain: Chain;
    token: Token;
    targetChain: Chain;
    targetToken: Token;
    amount: string;
    destination?: string;
  }) => {
    if (!targetToken || !chain || !targetChain || !amount) return;
    return getRoute(chain, targetChain, token, targetToken, account, amount, destination ? destination : account)
  };

  const swap = async ({
    chain,
    token,
    targetChain,
    targetToken,
    amount,
    destination,
    route,
    onSuccess,
  }: {
    chain: Chain;
    token: Token;
    targetChain: Chain;
    targetToken: Token;
    amount: string;
    destination?: string;
    route: Route,
    onSuccess: (hash: string) => void;
  }) => {
    if (!provider) return;
    const signer = await provider.getSigner(account);
    if (route) {
      const tx = await lifi.executeRoute(signer, route);
      console.log(tx)
      try {
        const process = tx.steps[tx.steps.length - 1].execution?.process
        if (!process) {
          return
        }

        const outChainProcess = process.filter(item => item.type === 'CROSS_CHAIN')[0]

        let txHash = outChainProcess.txHash
        const txLink = outChainProcess.txLink
        const start = process[0].startedAt
        const end = process[process.length - 1].doneAt as number
        const duration =  Math.ceil((end - start) / 1000 / 60)
        txHash = txHash || ''
        onSuccess(txHash);
        if (!txHash) {
          return
        }
     
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
          transactionHash: txHash,
        });
        _bridgeTxs[txHash] = {
          amount,
          inputChain: chain.chainName,
          outputChain: targetChain.chainName,
          symbol: token.symbol,
          tx: txHash,
          txLink,
          time: Date.now(),
          scan: chain.blockExplorers,
          isStargate: false,
          duration: duration + ' min',
          status: 'success',
          fromTokenUrl: tx.fromToken.logoURI,
        };
        localStorage.setItem('bridgeTxs', JSON.stringify(_bridgeTxs));
      } catch(e) {
        console.log(e)
      }
    }
  };

  return {
    getQouteInfo,
    swap,
    gasCost: fee,
  };
}
