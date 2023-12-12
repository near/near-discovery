import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useRecommendList(campaign_id: string) {
  const [recommends, setRecommends] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const queryRecommends = useCallback(
    async (_page: number) => {
      if (loading) return;
      setLoading(true);
      try {
        const result = await get(`${QUEST_PATH}/api/quest/recommend_list?campaign_id=1&page=${_page}&page_szie=2`);
        const data = result.data.data || [];
        setRecommends(data);
        setLoading(false);
        setPage(_page);
        setMaxPage(result.data.total_page);
      } catch (err) {
        setLoading(false);
      }
    },
    [campaign_id, loading],
  );

  const handlePageChange = useCallback(
    (step: -1 | 1) => {
      const _page = page + step;
      queryRecommends(_page);
    },
    [page],
  );

  useEffect(() => {
    if (campaign_id) queryRecommends(1);
  }, [campaign_id]);

  return { loading, recommends, page, maxPage, handlePageChange };
}
