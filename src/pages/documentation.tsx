import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const Documentation: NextPageWithLayout = () => {
  return <iframe style={{ flexGrow: 'inherit' }} src="https://docs.near.org"></iframe>;
};

Documentation.getLayout = useDefaultLayout;

export default Documentation;
