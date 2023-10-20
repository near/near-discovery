import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const EcosystemOverviewPage: NextPageWithLayout = ({ flags, featureFlags }) => {
  const components = useBosComponents();
  const { push } = useRouter();

  //todo make a better example showing client side flag resolution
  console.log('flag ', flags, featureFlags);
  if (flags && !flags.settings_beta_enabled) {
    push('/');
  }

  return !flags ? (
    <>Loading...</>
  ) : (
    <ComponentWrapperPage
      src={components.nearOrg.ecosystemOverviewPage}
      meta={{
        title: 'NEAR | Ecosystem Overview',
        description:
          'Projects building on NEAR are at the center. The Ecosystem is supporting them with everything they need to succeed.	DAOs: A new way to organize, fund, and empower communities · Explore DAOs, participate or get funding · NEARWEEK · Human Guild · TenK DAO.',
      }}
    />
  );
};

EcosystemOverviewPage.getLayout = useDefaultLayout;

export default dynamic(() => Promise.resolve(withLDConsumer()(EcosystemOverviewPage)), { ssr: false });
