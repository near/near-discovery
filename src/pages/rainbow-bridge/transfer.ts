import type { Transfer } from '@near-eth/client';
import { bridgedETH, bridgedNEAR, naturalETH, naturalNEAR } from '@near-eth/near-ether';
import { bridgedNep141,naturalErc20 } from '@near-eth/nep141-erc20';
import type { EIP1193Provider } from '@web3-onboard/core';
import Big from 'big.js';
import { ethers } from 'ethers';

import { bridgeParams,Erc20Abi } from '@/pages/rainbow-bridge/components/config';

import { expandToken } from './utils';

const transfer = async (props: {
  token: any;
  amount: string;
  sender: string;
  sourceBridge: string;
  accountId: string;
}) => {
  const { token, amount: amountIn, sender, sourceBridge, accountId } = props;

  let transfer: Transfer | null = null;

  const amount = expandToken(amountIn, token.decimals).toFixed();

  //   nep141 to eth
  if (sourceBridge === 'near' && !!token.near_address) {
    transfer = await bridgedNep141.sendToEthereum({
      erc20Address: token.ethereum_address,
      amount,
      recipient: sender,
    });
  }

  // NEAR to eth
  if (sourceBridge === 'near' && token.symbol === 'NEAR') {
    transfer = await naturalNEAR.sendToEthereum({
      amount,
      recipient: sender,
    });
  }

  //  ETH to eth
  if (sourceBridge === 'near' && !token.ethereum_address) {
    transfer = await bridgedETH.sendToEthereum({
      amount,
      recipient: sender,
    });
  }

  //   erc20 to nep141
  if (sourceBridge === 'eth' && !!token.ethereum_address) {
    transfer = await naturalErc20.sendToNear({
      erc20Address: token.ethereum_address,
      amount,
      recipient: accountId,
    });
  }

  //   NEAR to NEAR
  if (sourceBridge === 'eth' && token.symbol === 'NEAR') {
    transfer = await bridgedNEAR.sendToNear({
      amount,
      recipient: accountId,
    });
  }

  //   ETH to near
  if (sourceBridge === 'eth' && !token.ethereum_address) {
    transfer = await naturalETH.sendToNear({
      amount,
      recipient: accountId,
    });
  }

  return transfer;
};

export { transfer };
