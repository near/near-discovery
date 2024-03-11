import { useUserStore } from '@/stores/user';
import useInititalDataWithAuth from './useInititalDataWithAuth';

export default function useUserInfo() {
  const userInfo = useUserStore((store: any) => store.user);
  const { queryUserInfo } = useInititalDataWithAuth();

  return {
    userInfo,
    queryUserInfo,
  };
}
