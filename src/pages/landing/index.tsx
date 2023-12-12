import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import LandingView from '@/views/Landing';

const LandingPage: NextPageWithLayout = () => {
  return <LandingView/>;
};


LandingPage.getLayout = useDefaultLayout;

export default LandingPage;