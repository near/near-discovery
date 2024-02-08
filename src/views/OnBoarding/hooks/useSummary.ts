import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';

const useSummary = (chainId: number) => {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await get(`/api/action/summary?chain_id=${chainId}`);
      setInfo(response?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [chainId]);

  useEffect(() => {
    if (chainId) queryInfo();
  }, [chainId]);

  return { loading, info };
};

export default useSummary;
