import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';

export default function useUserInfo(id?: string) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryInfo = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`http://139.162.85.48:8101/api/user?campaign_id=${id}`);
      const data = result.data || [];
      setInfo(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [id, loading]);

  useEffect(() => {
    if (id) queryInfo();
  }, [id]);

  return { loading, info };
}
