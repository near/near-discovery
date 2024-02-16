import { useCallback, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import useToast from '@/hooks/useToast';
import { get, post } from '@/utils/http';

export default function usePasswordAction(cb: VoidFunction) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleConfirm = useCallback(async (id: number, data: string) => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading({
      title: 'Confirming...',
    });
    try {
      const result = await get(`${QUEST_PATH}/api/quest/check_action?id=${id}&data=${data}`);
      if (result.code !== 0 || result.data?.status !== 'completed') throw new Error('Invalid secret phrase');
      toast.dismiss(toastId);
      toast.success({
        title: `Action confirmed successfully`,
      });
      setLoading(false);
      cb();
    } catch (err: any) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.fail({
        title: err.message || `Action confirmed failed`,
      });
    }
  }, []);

  return { loading, handleConfirm };
}
