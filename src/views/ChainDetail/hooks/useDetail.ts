import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

const useDetail = (id: number) => {
  const [detail, setDetail] = useState<any>();
  const [hotDapps, setHotDapps] = useState<any>();
  const [activities, setActivities] = useState<any>();
  const [quests, setQuests] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryDetail = useCallback(async () => {
    const response = await get(`${QUEST_PATH}/api/network?id=${id}`);
    setDetail(response.data);
  }, [id]);

  const queryHotDapps = useCallback(async () => {
    const response = await get(`${QUEST_PATH}/api/dapp/hot_list?network_id=${id}&size=9`);
    setHotDapps(response.data);
  }, [id]);

  const queryActivities = useCallback(async () => {
    const response = await get(
      `${QUEST_PATH}/api/action/get-popular-actions-by-network?network_id=${id}&page=1&page_size=10`,
    );
    setActivities(response.data?.data);
  }, [id]);

  const queryQuests = useCallback(async () => {
    const response = await get(`${QUEST_PATH}/api/quest/list_by_network?network_id=${id}`);
    setQuests(response.data);
  }, [id]);

  // const queryAds = useCallback(async () => {
  //   const response = await get(`${QUEST_PATH}/api/ad?category=network&category_id=${id}`);
  //   setAds(response.data[0]);
  // }, [id]);

  const init = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([queryDetail(), queryHotDapps(), queryQuests()]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    init();
  }, [id]);

  return { loading, detail, hotDapps, activities, quests };
};

export default useDetail;
