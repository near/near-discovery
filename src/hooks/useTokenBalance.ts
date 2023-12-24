import { Contract, utils } from 'ethers';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
const TOKEN_ABI = [
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
];

export default function useTokenBalance(address: string, decimals: () => void) {
  const { account, provider } = useAccount();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fresh, setFresh] = useState(0);
  const getBalance = async () => {
    if (!account || !address) return;
    setIsLoading(true);
    try {
      if (address === 'native') {
        console.log(4444444444444);
        const rawBalance = await provider.getBalance(account);
        setTokenBalance(utils.formatEther(rawBalance));
      } else {
        const TokenContract = new Contract(address, TOKEN_ABI, provider.getSigner());
        const rawBalance = await TokenContract.balanceOf(account);
        setTokenBalance(utils.formatUnits(rawBalance, decimals));
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const update = () => {
    setFresh((n) => n + 1);
  };
  useEffect(() => {
    getBalance();
  }, [account, address, decimals, fresh]);

  return { tokenBalance, isError, isLoading, update };
}
