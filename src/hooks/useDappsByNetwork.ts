import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';

const useDappsByNetwork = (chainId: number) => {
  const [dapps, setDapps] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryDapps = useCallback(async () => {
    try {
      setLoading(true);
      const response = await get(`/api/dapp/list_by_network?chain_id=${chainId}`);

      const data = response?.data || [];
      setDapps(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [chainId]);

  useEffect(() => {
    if (chainId) queryDapps();
  }, [chainId]);

  return { loading, dapps };
};

export default useDappsByNetwork;
