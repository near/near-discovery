import { useCallback, useState } from 'react';
import { useRewardStore } from '@/stores/reward';
import { get } from '@/utils/http';

export default function useUserReward() {
  const [loading, setLoading] = useState(false);
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

  return { loading, info: rewardStore.reward, queryUserReward };
}
