import { NearContext } from '@/components/WalletSelector';
import { useState, useEffect, useContext } from 'react';

const useNearBlocksTxns = (contract:string, method:string) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { wallet, signedAccountId } = useContext(NearContext);

  useEffect(() => {
    if (!wallet || !signedAccountId) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`https://api.nearblocks.io/v1/account/${contract}/txns?from=${signedAccountId}&method=${method}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [contract, method,wallet, signedAccountId]);

  return { transactions, loading, error };
};

export default useNearBlocksTxns;