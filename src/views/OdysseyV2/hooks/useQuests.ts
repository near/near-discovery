import { get } from '@/utils/http';
import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

const defaultQuests: any = { social: [], bridge: [], swap: [], lending: [] };

export default function useQuests() {
  const [quests, setQuests] = useState(defaultQuests);
  const [loading, setLoading] = useState(true);

  const queryQuests = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/compass/v2/quest_list', { id: 2 });
      setLoading(false);
      if (result.code !== 0 || !result.data?.length) {
        setQuests(defaultQuests);
        return;
      }
      const _result = cloneDeep(defaultQuests);

      result.data.forEach((item: any) => {
        if (item.category_id === 0) {
          _result.social.push(item);
        }
        if (item.category_id === 1) {
          _result.bridge.push(item);
        }
        if (item.category_id === 2) {
          _result.swap.push(item);
        }
        if (item.category_id === 3) {
          _result.lending.push(item);
        }
      });
      setQuests(_result);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queryQuests();
  }, []);

  return { loading, quests };
}
