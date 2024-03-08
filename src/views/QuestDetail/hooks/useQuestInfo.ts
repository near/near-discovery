import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useQuestInfo(id?: string, source?: string) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryQuestInfo = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const params = id ? `id=${id}` : `source=${source}`;

      const result = await get(`${QUEST_PATH}/api/quest?${params}`);
      const data = result.data || [];
      setInfo(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [id, source, loading]);

  useEffect(() => {
    if (id || source) queryQuestInfo();
  }, [id, source]);

  return { loading, info };
}