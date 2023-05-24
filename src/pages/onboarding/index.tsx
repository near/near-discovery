import { Sandbox } from '@/components/sandbox';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const OnboardingPage: NextPageWithLayout = () => {
  return <Sandbox onboarding />;
};

OnboardingPage.getLayout = useDefaultLayout;

export default OnboardingPage;
