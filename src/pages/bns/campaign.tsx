import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import BnsCompaignView from '@/views/bns/compaign';

const BnsCompaignPage: NextPageWithLayout = () => {
  return <BnsCompaignView />;
};

BnsCompaignPage.getLayout = useSimpleLayout;

export default BnsCompaignPage;
