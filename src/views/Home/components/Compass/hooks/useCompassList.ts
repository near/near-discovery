import { useCallback, useEffect, useState } from 'react';

import { get } from '@/utils/http';

export default function useCompassList(campaign_id?: string) {
  const [compassList, setCompassList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const queryCompassList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/compass/list`);
      const data = result.data
      setCompassList(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    queryCompassList();
  }, []);

  return { loading, compassList };
}
