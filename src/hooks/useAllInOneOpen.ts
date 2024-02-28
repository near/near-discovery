import { useRouter } from 'next/router';
import { useAllInOneTabStore } from '@/stores/all-in-one';

export default function useAllInOneOpen() {
  const router = useRouter();
  const set = useAllInOneTabStore((store: any) => store.set);
  const open = (path: any, tab: any) => {
    set({ tab });
    router.push(`/all-in-one/${path}`);
  };

  return { open };
}
