import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import Analytics from '@/views/analytics';

const Page: NextPageWithLayout = () => {
  return <Analytics />;
};
Page.getLayout = useDefaultLayout;

export default Page;
