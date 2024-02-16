import { useDefaultLayout } from '@/hooks/useLayout';
import HomeView from '@/views/Home';
import type { NextPageWithLayout } from '@/utils/types';

const HomePage: NextPageWithLayout = () => {
  return <HomeView />;
};

HomePage.getLayout = useDefaultLayout;

export default HomePage;
