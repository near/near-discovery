import { useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';

export default function useDetail() {
  const [detail, setDetail] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const queryDetail = useCallback(async () => {
    try {
      setLoading(true);
      const result = await get('/api/compass/v2/detail', { id: 2 });
      if (result.code === 0 && result.data) {
        setDetail({
          total_users: result.data.total_users,
          total_players: result.data.total_players,
          claimed_reward: result.data.claimed_reward,
          available_spins: result.data.user?.available_spins,
          unclaimed_reward: result.data.user?.unclaimed_reward,
          total_spins: result.data.user?.total_spins,
        });
      } else {
        setDetail({});
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queryDetail();
  }, []);

  return { detail, loading, queryDetail };
}
