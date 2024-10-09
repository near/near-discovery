import { MetaTags } from '@/components/MetaTags';
import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const CookiesOverviewPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <>
      <MetaTags
        title="Near.org Cookie Policy"
        description="This Cookie Policy explains how Discovery Domain, Ltd. and its group companies use cookies and similar technologies when you visit our websites such as pagoda.co and other managed websites that link to this policy"
      />
      <VmComponent src={components.nearOrg.cookiePolicy} />
    </>
  );
};

CookiesOverviewPage.getLayout = useDefaultLayout;

export default CookiesOverviewPage;
