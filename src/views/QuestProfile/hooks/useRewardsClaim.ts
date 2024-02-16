import { useCallback, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import useToast from '@/hooks/useToast';
import { get, post } from '@/utils/http';

export default function useRewardsClaim() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClaim = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading({
      title: 'Claiming',
    });
    try {
      const result = await post(`${QUEST_PATH}/api/invite/claim`, {});
      if (result.code !== 0) throw new Error(result.msg);
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
