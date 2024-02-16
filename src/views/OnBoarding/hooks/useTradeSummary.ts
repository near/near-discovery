import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';

const useSummary = (chainId: number) => {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await get(`/api/action/summary/trade?chain_id=${chainId}`);
      const list = response?.data || {};

      const result: any = {};
      list.forEach((item: any) => {
        result[item.action_type] = item.total_execution;
      });
      setInfo(result);
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
