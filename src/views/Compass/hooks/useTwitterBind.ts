import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import useToast from '@/hooks/useToast';
import { QUEST_PATH } from '@/config/quest'
import { post } from '@/utils/http';
import useUserInfo from '@/hooks/useUserInfo';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

const MAPS = {
  twitter: {
    label: 'Twitter',
    path: '/api/user/bind/twitter',
  }
}

export default function useTwitterBind({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const { info: userInfo = {}, queryInfo } = useUserInfo({ updater: 1 });
  const [loading, setLoading] = useState(false);
  const code = searchParams.get('code');
  const config = useAuthConfig()
  const { fail, success } = useToast()


  const redirectToTwitter = useCallback((source?: string) => {
    if (!userInfo.twitter || !userInfo.twitter.is_bind) {
      const { location } = window
      const redirectUrl = encodeURIComponent(`${location.href}`)
      const path = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${config.twitter_client_id}&redirect_uri=${redirectUrl}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
      window.open(path, '_blank');
      return
    }

    if (source) {
      window.open(source, '_blank');
    }
  }, [config, userInfo])


  const bind = useCallback(async () => {
    const params = { code, redirect_uri: `${window.location.origin}${window.location.pathname}?id=${id}` };
    // const params = { code, redirect_uri: `http://localhost:3000/quest/detail?id=24` };

    const result = await post(`${QUEST_PATH}${MAPS.twitter.path}`, params);

    if (result.code !== 0) {
      fail({
        title: 'Fail',
        text: result.msg
      })
      return
    }

    setTimeout(() => {
      window.location.href = params.redirect_uri
    }, 200)
    // queryInfo()
    // success({
    //   title: 'Success',
    //   text: result.msg,
    // })

  }, [code, id])

  useEffect(() => {
    if (userInfo.twitter && !userInfo.twitter.is_bind && code) {
      bind()
    }
  }, [userInfo.twitter])

  return { loading, redirectToTwitter }
} 