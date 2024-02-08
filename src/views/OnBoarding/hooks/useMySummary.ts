import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';
import useAccount from '@/hooks/useAccount';

const useSummary = (chainId: number) => {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { account } = useAccount();

  const queryInfo = useCallback(
    async (_page?: number) => {
      try {
        setLoading(true);
        const response = await get(`/api/action/summary/my?chain_id=${chainId}&account_id=${account}`);
        setInfo(response?.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    [chainId, account],
  );

  useEffect(() => {
    if (chainId) queryInfo();
  }, [chainId]);

  return { loading, info };
};

export default useSummary;
