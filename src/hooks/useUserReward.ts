import { useCallback, useEffect, useState } from 'react';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useRewardStore } from '@/stores/reward';
import { get } from '@/utils/http';

export default function useUserReward() {
  const [loading, setLoading] = useState(false);
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const rewardStore: any = useRewardStore();

  const queryUserReward = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/user/reward`);
      const data = result.data || {};
      rewardStore.set({ reward: data });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  const getUserReward = () => {
    check(() => {
      queryUserReward();
    });
  };

  useEffect(() => {
    getUserReward();
  }, []);

  return { loading, info: rewardStore.reward, getUserReward };
}
