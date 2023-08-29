import { shrinkToken, expandToken } from './utils';

import { Erc20Abi } from '@/pages/rainbow-bridge/components/config';
import Big from 'big.js';

import { ethers } from 'ethers';

import type { WalletState } from '@web3-onboard/core';

const fetchNearAccount = (accountId: string) =>
  fetch('https://rpc.mainnet.near.org', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'dontcare',
      method: 'query',
      params: {
        request_type: 'view_account',
        finality: 'final',
        account_id: accountId,
      },
    }),
  });

const getBalanceNear = async (near: any, accountId: string, token: any) => {
  let amount = '0';
  if (!accountId) {
    return '0';
  }

  if (token.name === 'NEAR') {
    const account = await fetchNearAccount(accountId);
    amount = (await account.json()).amount;
  } else {
    amount = await near.viewCall(token.near_address, 'ft_balance_of', {
      account_id: accountId,
    });
  }

  return amount as string;
};

const getEthBalance = async (sender: string, token: any, wallet: WalletState) => {
  const provider = wallet?.provider;

  if (!provider) {
    return '0';
  }

  if (token.ethereum_address) {
    const Interface = new ethers.utils.Interface(Erc20Abi);

    const ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any');
    return ethersProvider
      .call({
        to: token.ethereum_address,
        data: Interface.encodeFunctionData('balanceOf', [sender]),
      })
      .then((rawBalance) => {
        const receiverBalanceHex = Interface.decodeFunctionResult('balanceOf', rawBalance);
        const rawAmount = receiverBalanceHex.toString();
        console.log('rawAmount: ', rawAmount);

        return shrinkToken(rawAmount, token.decimals).toFixed();
      });
  } else {
    return provider
      .request({
        method: 'eth_getBalance',
        params: [sender, 'latest'],
      })
      .then((res) => {
        console.log('res: ', res);
        const rawAmount = eval(res).toString(10);
        console.log('rawAmount: ', rawAmount);
        return shrinkToken(rawAmount, token.decimals).toFixed();
      });
  }
};

const getBalance = async (near: any, accountId: string, token: any, sender: string, wallet: WalletState) => {
  const nearbalance = await getBalanceNear(near, accountId, token);
  const ethBalance = await getEthBalance(sender, token, wallet);

  return {
    nearbalance: shrinkToken(nearbalance, token.decimals).toFixed(),
    ethBalance,
  };
};

export { getBalance };
