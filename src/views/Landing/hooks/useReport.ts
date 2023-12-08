import { useCallback, useEffect, useState } from 'react';
import { get, post } from '@/utils/http';
import useToast from '@/hooks/useToast';
import { QUEST_PATH } from '@/config/quest';

export default function useReport() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClaim = useCallback(async (id: string) => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading({
      title: 'Claiming',
    });
    try {
      await post(`${QUEST_PATH}:8101/api/quest/source`, {
        id,
      });
      toast.dismiss(toastId);
      toast.success({
        title: `Claimed successfully`,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.fail({
        title: `Claimed failed`,
      });
    }
  }, []);

  return { loading, handleClaim };
}
