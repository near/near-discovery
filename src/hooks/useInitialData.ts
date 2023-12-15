import { useCallback, useEffect } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { useChainsStore } from '@/stores/chains';
import { get } from '@/utils/http';

export default function useInitialData() {
  const chainsStore: any = useChainsStore();

  const queryChains = useCallback(async () => {
    if (chainsStore.chains?.length) return;
    try {
      const res = await get(`${QUEST_PATH}/api/network/list`);
      chainsStore.set({ chains: res.data });
    } catch (err) {}
  }, []);

  useEffect(() => {
    queryChains();
  }, []);
}
