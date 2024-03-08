import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useGetInviter(code?: any) {
  const [inviter, setInviter] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const queryInviter = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}/api/invite/get-inviter/${code}`);
      const data = result.data
      // setQuestList(data ? data.sort((prev: any, next: any) => prev.quest_category_id - next.quest_category_id) : []);
      setInviter(data)
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading, code]);

  useEffect(() => {
    if (code) queryInviter();
  }, [code]);

  return { loading, inviter, queryInviter };
}
