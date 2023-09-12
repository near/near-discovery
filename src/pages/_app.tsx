import '@/styles/theme.css';
import '@/styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@near-wallet-selector/modal-ui/styles.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import { Toaster } from '@/components/lib/Toast';
import { VmComponent } from '@/components/vm/VmComponent';
import { useBosLoaderInitializer } from '@/hooks/useBosLoaderInitializer';
import { useClickTracking } from '@/hooks/useClickTracking';
import { useHashUrlBackwardsCompatibility } from '@/hooks/useHashUrlBackwardsCompatibility';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import { useAuthStore } from '@/stores/auth';
import { init as initializeAnalytics } from '@/utils/analytics';
import {
  handleTurnOn,
  isNotificationSupported,
  isPermisionGranted,
  isPushManagerSupported,
} from '@/utils/notifications';
import type { NextPageWithLayout } from '@/utils/types';
import { styleZendesk } from '@/utils/zendesk';

const VmInitializer = dynamic(() => import('../components/vm/VmInitializer'), {
  ssr: false,
});

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useBosLoaderInitializer();
  useHashUrlBackwardsCompatibility();
  usePageAnalytics();
  useClickTracking();
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const authStore = useAuthStore();
  const componentSrc = router.query;
  const accountId = useAuthStore((store) => store.accountId);

  useEffect(() => {
    setNotificationsSessionStorage();
  }, []);

  useEffect(() => {
    initializeAnalytics();
  }, []);

  useEffect(() => {
    // Displays the Zendesk widget only if user is signed in and on the home page
    if (!window.zE) return;
    if (!authStore.signedIn || Boolean(componentSrc?.componentAccountId && componentSrc?.componentName)) {
      window.zE('webWidget', 'hide');
      return;
    }
    localStorage.setItem('accountId', authStore.accountId);
    window.zE('webWidget', 'show');
  }, [authStore.accountId, authStore.signedIn, componentSrc]);

  useEffect(() => {
    const interval = setInterval(zendeskCheck, 20);

    function zendeskCheck() {
      // once the zendesk widget comes online, style it
      const zwFrame = document.getElementById('launcher') as HTMLIFrameElement | null;
      const zwEmbed = zwFrame?.contentDocument?.getElementById('Embed');
      const zwButton = zwEmbed?.querySelector('[data-testid="launcher"]');
      if (zwButton) {
        styleZendesk();
        clearInterval(interval);
      }
    }

    () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="CDEVFlJTyVZ2vM7ePugKgWsl_7Rd-MrfDv42u0vZ0B0" />
        <link rel="icon" href="favicon.ico" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_HOSTNAME}/near/widget/NearOrg.HomePage`}
          key="canonical"
        />
      </Head>

      <Script id="phosphor-icons" src="https://unpkg.com/@phosphor-icons/web@2.0.3" async />

      <Script
        src="https://static.zdassets.com/ekr/snippet.js?key=1736c8d0-1d86-4080-b622-12accfdb74ca"
        id="ze-snippet"
        async
      />

      <Script id="zendesk-config" strategy="afterInteractive">
        {`
          window.zESettings = {
            webWidget: {
              color: { theme: '#2b2f31' },
              offset: {
                horizontal: '10px',
                vertical: '10px',
                mobile: { horizontal: '2px', vertical: '65px', from: 'right' },
              },
              contactForm: {
                attachments: true,
                title: { '*': 'Feedback and Support' },
                fields: [
                  {
                    id: 13149356989591,
                    prefill: { '*': localStorage.getItem('accountId') },
                  },
                ],
              },
            },
          };
        `}
      </Script>

      <Script id="bootstrap" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

      {/* Temporary solution. It will be replaced with the modal, that will use this component */}
      <VmComponent
        src="mbodnar.near/widget/TurnOn"
        props={{
          handleTurnOn: async () => await handleTurnOn(accountId),
          isNotificationSupported,
          isPushManagerSupported,
          isPermisionGranted,
        }}
      />
      {/*  */}

      <VmInitializer />

      {getLayout(<Component {...pageProps} />)}

      <Toaster />
    </>
  );
}
