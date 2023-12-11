import { useCallback, useEffect } from 'react';
import { get } from '@/utils/http';
import { TTAPI_PATH } from '@/config/quest';
import { useChainsStore } from '@/stores/chains';

export default function useChains() {
  const setChains = useChainsStore((store: any) => store.set);

  const queryChains = useCallback(async () => {
    try {
      const res = await get(`${TTAPI_PATH}/operations/Network/GetList`);
      setChains({ chains: res.data.data });
    } catch (err) {}
  }, []);

  useEffect(() => {
    queryChains();
  }, []);
}
