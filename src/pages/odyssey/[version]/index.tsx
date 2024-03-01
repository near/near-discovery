import { useRouter } from 'next/router';
import { useDefaultLayout } from '@/hooks/useLayout';
import OdysseyV2 from '@/views/OdysseyV2';
import CompassApp from '@/views/Compass/home';

const OdysseyPage = () => {
  const router = useRouter();
  if (router.query.version === 'v2') {
    return <OdysseyV2 />;
  }

  return <CompassApp />;
};

OdysseyPage.getLayout = useDefaultLayout;

export default OdysseyPage;
