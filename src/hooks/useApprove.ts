import Big from 'big.js';
import { Contract, providers, utils } from 'ethers';
import { useEffect, useState } from 'react';

import type { Chain, Token } from '@/types';

import useAccount from './useAccount';

const { JsonRpcProvider, Web3Provider } = providers;

export default function useApprove({
  token,
  amount,
  chain,
  spender,
}: {
  token?: Token;
  amount?: string;
  chain?: Chain;
  spender?: string;
}) {
  const [approved, setApproved] = useState(false);
  const [approving, setApproving] = useState(false);
  const { account, provider } = useAccount();

  const checkApproved = async () => {
    if (!token || !amount || !chain || !spender) return;
    const provider = new JsonRpcProvider(chain?.rpcUrls[0]);
    const TokenContract = new Contract(
      token.address,
      [
        {
          inputs: [
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'address', name: '', type: 'address' },
          ],
          name: 'allowance',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      provider,
    );
    const allowanceRes = await TokenContract.allowance(account, spender);

    const needApproved = new Big(utils.formatUnits(allowanceRes.toString(), token.decimals)).lt(amount);
    setApproved(!needApproved);
  };

  const approve = async () => {
    if (!token || !amount || !chain || !spender) return;
    setApproving(true);
    try {
      const signer = provider.getSigner(account);
      const TokenContract = new Contract(
        token.address,
        [
          {
            inputs: [
              { internalType: 'address', name: 'spender', type: 'address' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
            name: 'approve',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        signer,
      );
      const tx = await TokenContract.approve(spender, new Big(amount).mul(10 ** token.decimals).toString());
      const res = await tx.wait();
      setApproving(false);
      if (res.status === 1) setApproved(true);
    } catch (err) {
      setApproving(false);
    }
  };

  useEffect(() => {
    if (token && amount && chain && spender) checkApproved();
  }, [token, amount, chain, spender]);

  return { approved, approve, approving };
}
