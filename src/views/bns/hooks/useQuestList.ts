import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useQuestList(campaign_id?: string) {
  const [questList, setQuestList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const queryQuests = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}/api/quest/list?campaign_id=${campaign_id}`);
      setQuestList(result.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading, campaign_id]);

  useEffect(() => {
    if (campaign_id) queryQuests();
  }, [campaign_id]);

  return { loading, questList };
}
