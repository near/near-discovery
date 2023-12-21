import { useCallback, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import useToast from '@/hooks/useToast';
import { get, post } from '@/utils/http';

export default function useActionCheck(cb: VoidFunction) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleRefresh = useCallback(async (id: number) => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading({
      title: 'Action refreshing',
    });
    try {
      const result = await get(`${QUEST_PATH}/api/quest/check_action?id=${id}`);
      if (result.code !== 0) throw new Error(result.msg);
      toast.dismiss(toastId);
      toast.success({
        title: `Action refreshed successfully`,
      });
      setLoading(false);
      cb();
      if (result.data?.status === 'completed') cb();
    } catch (err) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.fail({
        title: `Action refreshed failed`,
      });
    }
  }, []);

  return { checking: loading, handleRefresh };
}
