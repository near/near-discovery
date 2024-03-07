import { useSimpleLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import ReferralLoginView from '@/views/bns/referralLogin';

const ReferralLoginPage: NextPageWithLayout = () => {
  return <ReferralLoginView />;
};

ReferralLoginPage.getLayout = useSimpleLayout;

export default ReferralLoginPage;
