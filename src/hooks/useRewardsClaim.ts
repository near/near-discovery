import { useCallback, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import useToast from '@/hooks/useToast';
import { get, post } from '@/utils/http';

export default function useRewardsClaim(onSuccess: VoidFunction) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClaim = useCallback(async (id: string) => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading({
      title: 'Claiming',
    });
    try {
      const result = await post(`${QUEST_PATH}/api/quest/claim`, {
        id,
      });
      console.log(result);
      toast.dismiss(toastId);
      toast.success({
        title: `Claimed successfully`,
      });
      onSuccess();
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
