import { QUEST_PATH } from '@/config/quest';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useUserStore } from '@/stores/user';
import { get } from '@/utils/http';
import { useCallback, useEffect, useState } from 'react';

export default function useInviteList() {
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [totalRewards, setTotalRewards] = useState(0);
  const [reward, setReward] = useState(0);
  const userInfo = useUserStore((store: any) => store.user);
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });

  const queryList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setList([]);
    try {
      const result = await get(`${QUEST_PATH}/api/invite/list`);
      const data = result.data || {};
      setTotalRewards(data.reward || 0);
      setReward(data.invite_reward || 0);
      setList(data.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (!userInfo) return;
    check(() => {
      queryList();
    });
  }, [userInfo]);

  return { loading, list, totalRewards, reward };
}
