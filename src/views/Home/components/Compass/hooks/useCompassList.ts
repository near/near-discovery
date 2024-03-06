import { useCallback, useEffect, useState } from 'react';
import { useOdysseyStore } from '@/stores/odyssey';
import { get } from '@/utils/http';

export default function useCompassList(campaign_id?: string) {
  const [compassList, setCompassList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const odysseyStore: any = useOdysseyStore();

  const queryCompassList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/compass/list`);
      const data = result.data || [];
      setCompassList(data.sort((a: any, b: any) => b.id - a.id));
      setLoading(false);
      odysseyStore.setOdyssey(data);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (odysseyStore.odyssey.length) {
      setCompassList(odysseyStore.odyssey);
      return;
    }
    queryCompassList();
  }, []);

  return { loading, compassList };
}
