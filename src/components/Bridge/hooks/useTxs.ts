import { useCallback, useState, useEffect } from 'react';

export default function useTxs(updater?: number) {
  const [count, setCount] = useState(0);
  const [txs, setTxs] = useState();
  const [loading, setLoading] = useState(false);
  const getTxsStatus = useCallback(async () => {
    setLoading(true);
    try {
      const bridgeTxs = localStorage.getItem('bridgeTxs') || JSON.stringify({});
      const _bridgeTxs = JSON.parse(bridgeTxs);
      const txIds = Object.values(_bridgeTxs || {})
        .filter((tx: any) => !tx?.status || tx?.status === 'processing')
        .map((tx: any) => tx.tx);
      const calls = txIds.map((txId: string) => fetch(`https://api-mainnet.layerzero-scan.com/tx/${txId}`));
      const response = await Promise.all(calls);
      response?.forEach(async (item: any, i) => {
        const _item = await item.json();
        _bridgeTxs[txIds[i]].status = _item.messages[0]?.status === 'DELIVERED' ? 'success' : 'pending';
      });
      setCount(txIds.length);
      setTxs(_bridgeTxs);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getTxsStatus();
  }, [updater]);
  return { count, txs, loading };
}
