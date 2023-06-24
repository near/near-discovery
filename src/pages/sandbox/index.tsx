import { Sandbox } from '@/components/sandbox';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const SandboxPage: NextPageWithLayout = () => {
  return <Sandbox />;
};

SandboxPage.getLayout = useDefaultLayout;

export default SandboxPage;
