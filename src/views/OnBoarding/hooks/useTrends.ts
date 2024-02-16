import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';

const useTrends = (chainId: number, pageSize: number) => {
  const [list, setList] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const queryList = useCallback(
    async (_page?: number) => {
      try {
        setLoading(true);
        const response = await get(
          `/api/action/trends?chain_id=${chainId}&page=${_page || page}&page_size=${pageSize}`,
        );
        if (_page) setPage(_page);
        const list = response?.data?.data || [];
        setList(list);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    [chainId, pageSize, page],
  );

  useEffect(() => {
    if (chainId) queryList(1);
  }, [chainId]);

  return { loading, list };
};

export default useTrends;
