import { useCallback, useEffect } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import { useChainsStore } from '@/stores/chains';

export default function useChains() {
  const setChains = useChainsStore((store: any) => store.set);

  const queryChains = useCallback(async () => {
    try {
      const res = await get(`${QUEST_PATH}:9991/operations/Network/GetList`);
      setChains({ chains: res.data.data });
    } catch (err) {}
  }, []);

  useEffect(() => {
    queryChains();
  }, []);
}
