import { useCallback, useState } from 'react';
import { post } from '@/utils/http';

export default function useReport() {
  const [loading, setLoading] = useState(false);

  const handleReport = useCallback(async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      await post(`/api/compass/source`, {
        quest_id: id,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return { loading, handleReport };
}
