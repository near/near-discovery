import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import useToast from '@/hooks/useToast';
import { get, post } from '@/utils/http';

export default function useDailyTask() {
  const [tasks, setTasks] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [currentDay, setCurrentDay] = useState<any>({});
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const toast = useToast();

  const queryTasks = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}/api/quest/daily_check_in`);
      const data = result.data.data || [];
      setTasks(data);
      data.some((task: any, i: number) => {
        if (task.status === 'will_claim') {
          setCurrentDay(data[i - 1]);
          return true;
        }
        return false;
      });
      setConsecutiveDays(result.data.consecutive_days);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  const claim = useCallback(async () => {
    if (claiming) return;
    setClaiming(true);
    try {
      const result = await post(`${QUEST_PATH}/api/quest/daily_check_in`, {});
      if (result.code !== 0) throw new Error(result.msg);
      setClaiming(false);
      toast.success({ title: 'Dapped successfully' });
      tasks.some((task: any) => {
        if (task.status === 'claim') {
          task.status = 'claimed';
          return true;
        }
        return false;
      });
      setTasks(cloneDeep(tasks));
      setConsecutiveDays((prev) => prev + 1);
    } catch (err) {
      setClaiming(false);
      toast.fail({ title: 'Dapped failed' });
    }
  }, [claiming, tasks]);

  useEffect(() => {
    queryTasks();
  }, []);

  return { loading, tasks, consecutiveDays, claiming, currentDay, claim };
}
