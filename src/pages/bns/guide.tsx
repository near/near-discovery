import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import BnsGuideView from '@/views/bns/guide';

const BnsGuidePage: NextPageWithLayout = () => {
  return <BnsGuideView />;
};

BnsGuidePage.getLayout = useDefaultLayout;

export default BnsGuidePage;
