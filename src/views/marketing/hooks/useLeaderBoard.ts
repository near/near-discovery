import { useCallback, useEffect, useRef, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useLeaderboard(platform: 'bitget' | 'coin68') {
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [info, setInfo] = useState<any>();
  const timer = useRef<any>();

  const queryLeaderboard = useCallback(
    async (_page?: number) => {
      if (loading) return;
      setLoading(true);
      try {
        const result = await get(`${QUEST_PATH}/api/activity/leaderboard?category
=${platform}&page=${_page || page}&page_size=10`);
        const data = result.data.data || [];
        setList(data);
        setLoading(false);
        _page && setPage(_page);
        setMaxPage(result.data.total_page);
        setInfo({
          total_reward: result.data.total_reward,
          total_users: result.data.total_users,
          total_quest_execution: result.data.total_quest_execution,
        });
        clearTimeout(timer.current);
        timer.current = setTimeout(
          () => {
            queryLeaderboard();
          },
          15 * 1000 * 60,
        );
      } catch (err) {
        setLoading(false);
      }
    },
    [loading, page],
  );

  const handlePageChange = useCallback(
    (step: -1 | 1) => {
      const _page = page + step;
      queryLeaderboard(_page);
    },
    [page],
  );

  const handleRefresh = useCallback(() => {
    queryLeaderboard(1);
  }, []);

  useEffect(() => {
    queryLeaderboard(1);
  }, []);

  return { loading, list, page, info, maxPage, handlePageChange, handleRefresh };
}
