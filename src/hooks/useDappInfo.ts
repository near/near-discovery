import { useCallback, useEffect, useState } from 'react';
import { useDappStore } from '@/stores/dapp';
import { get } from '@/utils/http';

export default function useDappInfo(pathname?: string) {
  const [loading, setLoading] = useState(false);
  const dappStore: any = useDappStore();

  const queryDappInfo = useCallback(async () => {
    if (!pathname) return;
    dappStore.set({ dapp: null });
    try {
      setLoading(true);
      const result = await get(`/api/dapp?route=${pathname}`);
      if (result.code === 0) {
        dappStore.set({ dapp: result.data });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!dappStore.dapp || dappStore.dapp.route !== pathname) {
      queryDappInfo();
    }
  }, [pathname]);

  return { dapp: dappStore.dapp || {}, loading };
}
