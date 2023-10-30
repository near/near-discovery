import { Sandbox } from '@/components/sandbox';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EditPage: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(router.asPath.replace(/^\/edit/, '/sandbox'));
  }, []);

  return null;
};

EditPage.getLayout = useDefaultLayout;

export default EditPage;
