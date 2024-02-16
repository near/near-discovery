import { useEffect } from 'react';
import { initReactTrack, report } from '@/utils/burying-point';
import { getCookie } from 'cookies-next';
import { useDebounceFn } from 'ahooks';

export default function useClickTracking() {
  const { run: handleReport } = useDebounceFn(
    (code: string) => {
      const account = getCookie('LOGIN_ACCOUNT');
      if (!account || !code) return;
      report({ address: account, code });
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
