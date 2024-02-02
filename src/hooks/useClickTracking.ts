import { useEffect } from 'react';
import { initReactTrack, report } from '@/utils/burying-point';
import { getCookie } from 'cookies-next';

export default function useClickTracking() {
  useEffect(() => {
    initReactTrack({
      onClickEvent: (code: string) => {
        const account = getCookie('LOGIN_ACCOUNT');
        if (!account || !code) return;
        report({ address: account, code });
      },
    });
  }, []);
}
