import { useCallback, useEffect, useRef,useState } from 'react';

export default function useTxs(updater?: number) {
  const [count, setCount] = useState(0);
  const [txs, setTxs] = useState();
  const [loading, setLoading] = useState(false);
  const timer = useRef<any>();
  const getTxsStatus = useCallback(async () => {
    setLoading(true);

    try {
      const bridgeTxs = localStorage.getItem('bridgeTxs') || JSON.stringify({});
      const _bridgeTxs = JSON.parse(bridgeTxs);

      const txIds: any = Object.values(_bridgeTxs || {})
        .filter((tx: any) => (!tx?.status || tx?.status === 'processing' || tx?.status === "pending"))
      if (!txIds.length) {
        setTxs(_bridgeTxs);
        setCount(txIds.length);
        return;
      }

      const calls = txIds.map((tx: any) => {
        if (tx.isStargate) {
          return fetch(`https://api-mainnet.layerzero-scan.com/tx/${tx.tx}`)
        } else {
          return fetch(`https://li.quest/v1/status?txHash=${tx.tx}`)
        }
      });
      const response = await Promise.all(calls);
      let count = 0;
      response?.forEach(async (item: any, i) => {
        const _item = await item.json();
        let status = 'processing'
        if (_item.status) {
          if (_item.status === 'DONE') {
            status = 'success'
          }
        } else {
          status = _item.messages[0]?.status === 'DELIVERED' ? 'success' : 'processing'
        }
        count++;
        _bridgeTxs[txIds[i].tx].status = status;
        if (count === txIds.length) {
          localStorage.setItem('bridgeTxs', JSON.stringify(_bridgeTxs));
          setCount(txIds.length);
          setTxs(_bridgeTxs);
          clearTimeout(timer.current);
          timer.current = setTimeout(() => {
            getTxsStatus();
          }, 1000 * 60);
        }
      });
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getTxsStatus();
  }, [updater]);
  return { count, txs, loading };
}
