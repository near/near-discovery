import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useUserInfo(id?: string) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryInfo = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}/api/user${id ? '?campaign_id=' + id : ''}`);
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
