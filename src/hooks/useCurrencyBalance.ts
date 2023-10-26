import { useState, useEffect } from 'react';
import { Contract, providers, utils } from 'ethers';
import chains from '@/config/chains';
import useAccount from './useAccount';
import type { Token } from '@/types';

export default function useTokenBalance({
  currency,
  rpcUrl,
  updater,
  isNative,
  isPure,
}: {
  currency?: Token;
  rpcUrl?: string;
  updater?: number;
  isNative?: boolean;
  isPure?: boolean;
}) {
  const [balance, setBalance] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { account, chainId } = useAccount();

  useEffect(() => {
    const getBalance = async () => {
      const _rpcUrl = rpcUrl ? rpcUrl : chainId ? chains[chainId].rpcUrls[0] : '';
      if (!currency || !_rpcUrl || !account || !currency.address) return;
      setLoading(true);
      try {
        const provider = new providers.JsonRpcProvider(_rpcUrl);
        const TokenContract = new Contract(
          currency.address,
          [
            {
              constant: true,
              inputs: [
                {
                  name: '_owner',
                  type: 'address',
                },
              ],
              name: 'balanceOf',
              outputs: [
                {
                  name: 'balance',
                  type: 'uint256',
                },
              ],
              payable: false,
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider,
        );
        const res = await TokenContract.balanceOf(account);
        setBalance(isPure ? res.toString() : utils.formatUnits(res.toString(), currency.decimals).toString());
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    const getNativeBalance = async () => {
      const _rpcUrl = rpcUrl ? rpcUrl : chainId ? chains[chainId].rpcUrls[0] : '';
      if (!_rpcUrl || !account) return;
      setLoading(true);
      try {
        const provider = new providers.JsonRpcProvider(_rpcUrl);
        const amount = await provider.getBalance(account);
        setBalance(isPure ? amount.toString() : utils.formatUnits(amount.toString(), currency?.decimals).toString());
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (!!(currency?.address || currency?.isNative || isNative) && account)
      currency?.isNative || isNative ? getNativeBalance() : getBalance();
  }, [currency, account, updater]);
  return { balance, loading };
}
