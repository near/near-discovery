import { useSearchParams, useRouter } from 'next/navigation'
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import QuestDetailView from '@/views/QuestDetail';

const QuestDetailPage: NextPageWithLayout = () => {
  // for compass
  const router = useRouter()
  const searchParams = useSearchParams();
  const secondRedirect = searchParams.get('secondRedirect')
  const code = searchParams.get('code')
  if (secondRedirect) {
    let redirectUrl = ''
    if (secondRedirect.indexOf('code=') > -1) {
      redirectUrl = secondRedirect.replace(/code=[^&]*/, `code=${code}`)
    } else {
      redirectUrl = `${secondRedirect}&code=${code}`
    }
    router.replace(redirectUrl)
    return <></>
  }

  return <QuestDetailView />;
};

QuestDetailPage.getLayout = useDefaultLayout;

export default QuestDetailPage;
