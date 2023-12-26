import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import useToast from '@/hooks/useToast';
import { get, post } from '@/utils/http';

const MAPS = {
  twitter: {
    label: 'Twitter',
    path: '/api/user/bind/twitter',
  },
  telegram: {
    label: 'Telegram',
    path: `/api/user/bind/telegram`,
  },
  discord: {
    label: 'Discord',
    path: `/api/user/bind/discord`,
  },
};

type AuthType = 'telegram' | 'twitter' | 'discord';

export default function useAuthBind({ onSuccess }: { onSuccess: VoidFunction }) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<AuthType>();
  const toast = useToast();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const handleBind = useCallback(
    async (type: AuthType, data?: any) => {
      if (loading) return;
      setType(type);
      setLoading(true);
      const config = MAPS[type];
      const toastId = toast.loading({
        title: `${config.label} binding`,
      });
      try {
        let params = {};
        if (type === 'twitter' || type === 'discord') {
          params = { code, redirect_uri: window.location.href };
        }
        if (type === 'telegram') {
          params = data;
        }
        const result = await post(`${QUEST_PATH}${config.path}`, params);
        if (result.code !== 0) throw new Error(result.msg);
        toast.dismiss(toastId);
        toast.success({
          title: `${config.label} bind successfully`,
        });
        setLoading(false);
        onSuccess();
      } catch (err) {
        setLoading(false);
        toast.dismiss(toastId);
        toast.fail({
          title: `${config.label} bind failed`,
        });
      }
    },
    [code],
  );

  useEffect(() => {
    const type = sessionStorage.getItem('_auth_type');
    if (!code || !type) return;
    const state = sessionStorage.getItem('_auth_state');
    if (searchParams.get('state') !== state && type === 'twitter') return;
    handleBind(type as AuthType);
    sessionStorage.removeItem('_auth_type');
  }, [code]);

  return { loading, type, handleBind };
}
