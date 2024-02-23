import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import Dashboard from '@/views/dashboard';

const DashboardPage: NextPageWithLayout = () => {
  return <Dashboard />;
};
DashboardPage.getLayout = useDefaultLayout;

export default DashboardPage;
