import { useCallback, useState } from 'react';
import { post } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

export default function useReport() {
  const [loading, setLoading] = useState(false);

  const handleReport = useCallback(async (id: string) => {
    if (loading) return;
    setLoading(true);

    try {
      await post(`${QUEST_PATH}:8101/api/quest/source`, {
        id,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  return { loading, handleReport };
}
