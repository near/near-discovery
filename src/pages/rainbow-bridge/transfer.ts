import { type Transfer } from '@near-eth/client';
import { bridgedETH, bridgedNEAR, naturalETH, naturalNEAR } from '@near-eth/near-ether';
import { bridgedNep141, naturalErc20 } from '@near-eth/nep141-erc20';

import { expandToken } from './utils';

const transfer = async (props: {
  token: any;
  amount: string;
  sender: string;
  sourceBridge: string;
  accountId: string;
  near?: any;
}) => {
  const { token, amount: amountIn, sender, sourceBridge, accountId, near } = props;

  let transfer: Transfer | null = null;

  const wallet = await (await near.selector).wallet();

  const amount = expandToken(amountIn, token.decimals).toFixed(0);

  //  ETH to eth
  if (sourceBridge === 'near' && !token.ethereum_address && token.symbol === 'ETH') {
    transfer = await bridgedETH.sendToEthereum({
      amount,
      recipient: sender,
      options: {
        nearAccount: wallet,
      },
    });
  }

  //   nep141 to eth
  if (sourceBridge === 'near' && !!token.near_address && !!token.ethereum_address && token.symbol !== 'NEAR') {
    transfer = await bridgedNep141.sendToEthereum({
      erc20Address: token.ethereum_address,
      amount,
      recipient: sender,
      options: {
        ...token,
        nep141Address: token.near_address,
        nearAccount: wallet,
      },
    });
  }

  // NEAR to eth
  if (sourceBridge === 'near' && token.symbol === 'NEAR') {
    transfer = await naturalNEAR.sendToEthereum({
      recipient: sender,
      amount,
      options: {
        nearAccount: wallet,
      },
    });

    // const wallet = await (await near.selector).wallet();

    // const transaction = {
    //   receiverId: bridgeParams.nativeNEARLockerAddress,
    //   signerId: accountId,
    //   actions: [
    //     {
    //       type: 'FunctionCall',
    //       params: {
    //         methodName: 'migrate_to_ethereum',
    //         args: {
    //           eth_recipient: sender.replace('0x', ''),
    //         },
    //         gas: '10' + '0'.repeat(12),
    //         deposit: amount,
    //       },
    //     },
    //   ],
    // };
    // return wallet.signAndSendTransaction(transaction);
  }

  //   erc20 to nep141
  if (sourceBridge === 'eth' && !!token.ethereum_address && !!token.near_address && token.symbol !== 'NEAR') {
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
  if (sourceBridge === 'eth' && !token.ethereum_address && token.symbol === 'ETH') {
    transfer = await naturalETH.sendToNear({
      amount,
      recipient: accountId,
    });
  }

  return transfer;
};

export { transfer };
