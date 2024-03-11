import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const EditPage: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(router.asPath.replace(/^\/edit/, '/sandbox'));
  }, [router]);

  return null;
};

EditPage.getLayout = useDefaultLayout;

export default EditPage;
