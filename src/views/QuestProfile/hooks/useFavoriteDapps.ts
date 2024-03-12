import { useCallback, useEffect, useState } from 'react';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useUserStore } from '@/stores/user';
import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useFavoriteDapps() {
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const userInfo = useUserStore((store: any) => store.user);

  const queryList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}/api/dapp/favorite_list`);
      const data = result.data || [];
      setList(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (!userInfo?.address) return;
    check(() => {
      queryList();
    });
  }, [userInfo]);

  return { loading, list };
}
