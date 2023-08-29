import type { EIP1193Provider } from '@web3-onboard/core';
import Big from 'big.js';
import { ethers } from 'ethers';

import { bridgeParams,Erc20Abi } from '@/pages/rainbow-bridge/components/config';

// refresh to check allowance
export const checkApprove = async (
  token: any,
  amountIn: string,
  sourceBridge: string,
  provider: EIP1193Provider,
  sender: string,
  cb: () => void,
) => {
  const ethersProvider = new ethers.providers.Web3Provider(provider, 'any');

  const signer = ethersProvider.getSigner();

  if (sourceBridge === 'near' || !token.ethereum_address) {
    return true;
  }

  const contract = new ethers.Contract(token.ethereum_address, Erc20Abi, signer);

  return contract
    .allowance(sender, bridgeParams.erc20LockerAddress)
    .then((allowanceRaw: any) => {
      const parsedAllowance = Big(Number(allowanceRaw._hex)).div(Big(10).pow(token.decimals)).toFixed();

      const isApproved = Big(parsedAllowance).gte(amountIn);
      cb && cb();

      return isApproved;
    })
    .catch((e: any) => {
      console.error(e);

      return false;
    });
};

export const handleApprove = (amountIn: string, token: any, provider: EIP1193Provider) => {
  const ethersProvider = new ethers.providers.Web3Provider(provider, 'any');

  const signer = ethersProvider.getSigner();

  const contract = new ethers.Contract(token.ethereum_address, Erc20Abi, signer);

  return contract
    .approve(bridgeParams.erc20LockerAddress, ethers.utils.parseUnits(amountIn, token.decimals))
    .then((tx: any) => {
      tx.wait().then((res: any) => {
        const { status, transactionHash } = res;
        // deal with tx wait
      });
    })
    .catch((e: any) => {
      console.log(e, 'error:');
    });
};
