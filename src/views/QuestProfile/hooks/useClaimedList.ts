import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useClaimedList() {
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const queryList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}/api/quest/claimed_list`);
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
