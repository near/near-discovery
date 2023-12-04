import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';

export default function useQuestInfo(id?: string) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryQuestInfo = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/quest/api/quest?id=${id}`);
      const data = result.data || [];
      setInfo(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [id, loading]);

  useEffect(() => {
    if (id) queryQuestInfo();
  }, [id]);

  return { loading, info };
}
