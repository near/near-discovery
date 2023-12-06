import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

export default function useQuestList(campaign_id?: string) {
  const [quests, setQuests] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const queryQuests = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}:8101/api/quest/list?campaign_id=${campaign_id}`);
      const data = result.data || [];
      const _quests: any = {};
      data.forEach((record: any) => {
        if (_quests[record.quest_category_id]) {
          _quests[record.quest_category_id].push(record);
        } else {
          _quests[record.quest_category_id] = [record];
        }
      });
      setQuests(_quests);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading, campaign_id]);

  useEffect(() => {
    if (campaign_id) queryQuests();
  }, [campaign_id]);

  return { loading, quests };
}
