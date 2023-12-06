import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';

export default function useFavoriteDapps() {
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const queryList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get('http://139.162.85.48:8101/api/dapp/favorite_list');
      const data = result.data || [];
      setList(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    queryList();
  }, []);

  return { loading, list };
}
