import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useFavorites() {
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ unclaimed: 0, completed: 0, inprocess: 0 });

  const queryList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}/api/quest/favorite_list`);
      const data = result.data || [];
      let unclaimed = 0;
      let completed = 0;
      let inprocess = 0;
      data.forEach((item: any) => {
        if (item.participation_status === 'completed') {
          completed++;
          if (!item.is_claimed) unclaimed++;
          return;
        }
        if (item.participation_status === 'in_process') {
          inprocess++;
        }
      });
      setInfo({
        unclaimed,
        completed,
        inprocess,
      });
      setList(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    queryList();
  }, []);

  return { loading, list, info };
}
