import { useState, useEffect, useCallback } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

const useDetail = (id: number) => {
  const [detail, setDetail] = useState<any>();
  const [hotDapps, setHotDapps] = useState<any>();
  const [trends, setTrends] = useState<any>();
  const [loading, setLoading] = useState(false);

  const queryDetail = useCallback(async () => {
    const response = await get(`${QUEST_PATH}/api/network?id=${id}`);
    setDetail(response.data);
  }, [id]);

  const queryHotDapps = useCallback(async () => {
    const response = await get(`${QUEST_PATH}/api/dapp/hot_list?network_id=${id}&size=9`);
    setHotDapps(response.data);
  }, [id]);

  const queryTrends = useCallback(async () => {
    const response = await get(`${QUEST_PATH}/api/action/get-special-action`);
    // console.log('response', response);
  }, [id]);

  const init = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([queryDetail(), queryHotDapps(), queryTrends()]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    init();
  }, [id]);

  return { loading, detail, hotDapps };
};

export default useDetail;
