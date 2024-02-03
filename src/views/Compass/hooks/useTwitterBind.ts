import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react';
import { QUEST_PATH } from '@/config/quest';
import { post } from '@/utils/http';
import useUserInfo from '@/hooks/useUserInfo';

const MAPS = {
    twitter: {
      label: 'Twitter',
      path: '/api/user/bind/twitter',
    }
  }

 export default function useTwitterBind({ id }: { id: string }) {
    const searchParams = useSearchParams();
    const { info: userInfo = {} } = useUserInfo({ updater: 1 });
    const [loading, setLoading] = useState(false);
    const code = searchParams.get('code');

    const bind = useCallback(async () => {
        const params = { code, redirect_uri: `${window.location.origin}${window.location.pathname}?id=${id}` };
        const result = await post(`${QUEST_PATH}${MAPS.twitter.path}`, params);

    }, [code, id])

    useEffect(() => {
        bind()
    }, [code])

    return [ loading ]
 } 