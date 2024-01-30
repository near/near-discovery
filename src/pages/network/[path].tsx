import { useDefaultLayout } from '@/hooks/useLayout';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from '@/utils/types';
import ChainDetail from '@/views/ChainDetail';
import { PathToId } from '@/config/all-in-one/chains';

const DetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const path = router.query.path as string;

  return path && PathToId[path] ? <ChainDetail path={path} /> : null;
};

DetailPage.getLayout = useDefaultLayout;

export default DetailPage;
