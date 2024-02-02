import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAllInOneStore } from '@/stores/all-in-one';

export default function useAllInOneOpen() {
  const router = useRouter();
  const setAllInOne = useAllInOneStore((store: any) => store.set);
  const open = useCallback((chain: any, tab: any) => {
    setAllInOne({ allInOne: { tab } });
    router.push(`/all-in-one/${chain.path}`);
  }, []);

  return { open };
}
