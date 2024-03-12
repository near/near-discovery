import { useUserStore } from '@/stores/user';
import useInititalDataWithAuth from './useInititalDataWithAuth';

export default function useInviteList() {
  const inviteInfo = useUserStore((store: any) => store.invite);
  const { queryInviteList } = useInititalDataWithAuth();

  return {
    inviteInfo,
    queryInviteList,
  };
}
