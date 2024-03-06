import { useEffect } from 'react';
import { initReactTrack, report } from '@/utils/burying-point';
import { useDebounceFn } from 'ahooks';
import useAccount from './useAccount';

export default function useClickTracking() {
  const { account } = useAccount();
  const { run: handleReport } = useDebounceFn(
    (code: string) => {
      if (!code || !account) return;
      report({ address: account || '', code });
    },
    {
      wait: 500,
    },
  );
  useEffect(() => {
    initReactTrack({
      onClickEvent: handleReport,
    });
  }, []);
}
