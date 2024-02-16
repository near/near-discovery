import { useState, useEffect, useCallback } from 'react';
import { deleteRequest, get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import { useUUIdStore } from '@/stores/uuid';
import useAccount from '@/hooks/useAccount';

const useMyQuests = (chainId: number) => {
  const [list, setList] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const uuid = useUUIdStore((store: any) => store.uuid);
  const { account } = useAccount();

  const queryList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await get(
        `/api/action/get-action-by-account?account_id=${account}&account_info=${uuid}&chain_id=${chainId}`,
      );
      setList(response?.data || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [chainId]);

  const handleDelete = useCallback(async (action_id: string) => {
    try {
      const response = await deleteRequest(`/api/action/delete-action-by-id`, { action_id });
      if (response.code === 0) {
        queryList();
      }
      setDeleting(false);
    } catch (err) {
      setDeleting(false);
    }
  }, []);

  useEffect(() => {
    if (chainId) queryList();
  }, [chainId]);

  return { loading, list, deleting, handleDelete };
};

export default useMyQuests;
