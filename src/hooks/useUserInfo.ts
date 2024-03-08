import { useCallback, useEffect, useState } from 'react';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useUserStore } from '@/stores/user';
import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useUserInfo({ id, updater, from }: { id?: string; updater?: number; from?: string }) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const userStore = useUserStore((store: any) => store.user);

  const queryInfo = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`${QUEST_PATH}/api/user${id ? '?campaign_id=' + id : ''}`);
      const data = result.data || {};
      setInfo(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading, id]);

  useEffect(() => {
    check(() => {
      if (id) {
        queryInfo();
      }
    });
  }, [id]);

  useEffect(() => {
    if (!id && userStore.address) {
      setInfo(userStore);
    }
  }, [userStore]);

  useEffect(() => {
    if (!info) return;
    queryInfo();
  }, [updater]);

  return { loading, info, queryInfo };
}
