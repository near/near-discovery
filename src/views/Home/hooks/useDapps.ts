import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

const useDapps = () => {
  const [featuredDapps, setFeaturedDapps] = useState<any>();
  const [upcomingDapps, setUpcomingDapps] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryDapps = useCallback(async (type: any) => {
    const response = await get(`${QUEST_PATH}/api/dapp/list?tbd_token=${type}`);
    const data = response.data?.data.slice(0, 9) || [];
    const result = data.map((item: any) => ({
      ...item,
      category_ids: item.dapp_category?.map((_category: any) => _category.category_id),
    }));
    if (type === 'Y') {
      setFeaturedDapps(result);
    } else {
      setUpcomingDapps(result);
    }
  }, []);

  const init = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([queryDapps('Y'), queryDapps('N')]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  return { loading, featuredDapps, upcomingDapps };
};

export default useDapps;
