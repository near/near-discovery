import { useCallback } from 'react';
import { QUEST_PATH } from '@/config/quest';
import { useUserStore } from '@/stores/user';
import { checkAddressIsInvited, getAccessToken, inviteCodeActivate } from '@/apis';
import { get } from '@/utils/http';

export default function useInititalDataWithAuth() {
  const setUserInfo = useUserStore((store: any) => store.set);

  const queryUserInfo = useCallback(async () => {
    try {
      const result = await get(`${QUEST_PATH}/api/user`);
      const data = result?.data || {};
      setUserInfo({ user: data });
    } catch (err) {}
  }, []);

  const getInitialDataWithAuth = async (address?: string) => {
    if (address) {
      const checked = await checkAddressIsInvited(address);
      if (!checked) {
        await inviteCodeActivate(address, '');
      }
      await getAccessToken(address);
      queryUserInfo();
    } else {
      setUserInfo({ user: {} });
    }
  };

  return { getInitialDataWithAuth, queryUserInfo };
}
