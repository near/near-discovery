import { post } from '@/utils/http';
import { useCallback, useState } from 'react';
import useToast from '@/hooks/useToast';

export default function useClaim(onSuccess: VoidFunction) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onClaim = useCallback(async () => {
    setLoading(true);
    try {
      const result = await post('/api/compass/claim', { id: 2 });
      if (result.code === 0) {
        onSuccess();
        toast.success({
          title: 'Claim successfully',
        });
      } else {
        toast.fail({
          title: result.msg || 'Claim failed',
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return { loading, onClaim };
}
