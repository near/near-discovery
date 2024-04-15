import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ContactUsPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <ComponentWrapperPage
      src={components.gateway.contactUsPage}
      meta={{
        title: 'NEAR | Contact Us',
        description:
          'NEAR is a global community of Web3 enthusiasts and innovators. Dive into one of our social channels to engage in discussion with our lively community.',
      }}
    />
  );
};

ContactUsPage.getLayout = useDefaultLayout;

export default ContactUsPage;
