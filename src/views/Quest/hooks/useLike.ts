import { useCallback, useEffect, useState } from 'react';
import { get, post } from '@/utils/http';
import useToast from '@/hooks/useToast';
import { QUEST_PATH } from '@/config/quest';

export default function useLike(id: string, category: string) {
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const queryLike = useCallback(async () => {
    if (loading) return;
    try {
      const result = await get(`${QUEST_PATH}:8101/api/user/favorite?id=${id}&category=${category}`);
      const data = result.data?.favorite;
      setLike(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [loading, id, category]);

  const handleLike = useCallback(
    async (favorite: boolean) => {
      if (loading) return;
      setLoading(true);
      const toastId = toast.loading({
        title: 'Liking',
      });
      try {
        await post(`${QUEST_PATH}:8101/api/user/favorite`, {
          id,
          category,
          favorite,
        });
        toast.dismiss(toastId);
        toast.success({
          title: `${favorite ? 'Liked' : 'Unliked'} successfully`,
        });
        setLike(favorite);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.dismiss(toastId);
        toast.fail({
          title: `${favorite ? 'Liked' : 'Unliked'} failed`,
        });
      }
    },
    [id, category],
  );

  useEffect(() => {
    if (id && category) queryLike();
  }, [id, category]);

  return { like, loading, handleLike };
}
