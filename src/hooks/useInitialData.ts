import { useCallback, useEffect } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { useChainsStore } from '@/stores/chains';
import { useUserStore } from '@/stores/user';
import { get } from '@/utils/http';

export default function useInitialData() {
  const chainsStore: any = useChainsStore();
  const setUserInfo = useUserStore((store: any) => store.set);

  const queryChains = useCallback(async () => {
    if (chainsStore.chains?.length) return;
    try {
      const res = await get(`${QUEST_PATH}/api/network/list`);
      chainsStore.set({ chains: res.data });
    } catch (err) {}
  }, []);

  const queryUserInfo = useCallback(async () => {
    try {
      const result = await get(`${QUEST_PATH}/api/user`);
      const data = result.data || [];
      setUserInfo({ user: data });
    } catch (err) {}
  }, []);

  useEffect(() => {
    queryChains();
    queryUserInfo();
  }, []);
}
