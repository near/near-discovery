import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

export default function useUserInfo(id?: string) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryInfo = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}:8101/api/user${id ? '?campaign_id=' + id : ''}`);
      const data = result.data || [];
      setInfo(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading, id]);

  useEffect(() => {
    queryInfo();
  }, [id]);

  return { loading, info };
}
