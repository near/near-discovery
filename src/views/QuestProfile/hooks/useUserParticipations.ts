import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

export default function useUserParticipations() {
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ unclaimed: 0, completed: 0, inprocess: 0 });

  const queryList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}:8101/api/quest/participation_list`);
      const data = result.data || [];
      let unclaimed = 0;
      let completed = 0;
      data.forEach((item: any) => {
        if (item.participation_status === 'completed') {
          completed++;
          if (!item.is_claimed) unclaimed++;
          return;
        }
      });
      setInfo({
        unclaimed,
        completed,
        inprocess: data.length - unclaimed - completed,
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
