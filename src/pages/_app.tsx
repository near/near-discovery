import '@/styles/theme.css';
import '@/styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@near-wallet-selector/modal-ui/styles.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

import Gleap from 'gleap';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import { CookiePrompt } from '@/components/CookiePrompt';
import { openToast, Toaster } from '@/components/lib/Toast';
import { ResearchFormWizard } from '@/components/research-form-wizard/ResearchFormWizard';
import { useBosLoaderInitializer } from '@/hooks/useBosLoaderInitializer';
import { useClickTracking } from '@/hooks/useClickTracking';
import { useHashUrlBackwardsCompatibility } from '@/hooks/useHashUrlBackwardsCompatibility';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import { useAuthStore } from '@/stores/auth';
import { init as initializeAnalytics, recordHandledError, setReferrer } from '@/utils/analytics';
import { gleapSdkToken } from '@/utils/config';
import { setNotificationsLocalStorage } from '@/utils/notificationsLocalStorage';
import type { NextPageWithLayout } from '@/utils/types';
import { styleZendesk } from '@/utils/zendesk';
import { useResearchWizardEvents } from '@/hooks/useResearchWizardEvents';
import { useCookiePreferences } from '@/hooks/useCookiePreferences';

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
  const cookieData = useCookiePreferences();
  const { isResearchFormDismissed } = useResearchWizardEvents();
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const signedIn = useAuthStore((store) => store.signedIn);

  useEffect(() => {
    const referred_from_wallet = document.referrer.indexOf('https://wallet.near.org/') !== -1;
    const isFirebaseError = router.query.reason && referred_from_wallet;
    const msg = Array.isArray(router.query.reason) ? router.query.reason[0] : router.query.reason;
    if (isFirebaseError) {
      recordHandledError({ description: msg || 'unknown error during Fast Authentication' });
      openToast({
        title: 'An Error Occurred During Fast Authentication',
        type: 'WARNING',
        description: msg || '',
        duration: 5000,
      });
    }
  }, [router.query]);

  useEffect(() => {
    // this check is needed to init localStorage for notifications after user signs in
    if (signedIn) {
      setNotificationsLocalStorage();
    }
  }, [signedIn]);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      //save a reference to the currentl URL before the route change event completes
      setReferrer(window.location.href);
    });
  });

  useEffect(() => {
    initializeAnalytics();
  }, []);

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (gleapSdkToken && !cookieData && isResearchFormDismissed) Gleap.initialize(gleapSdkToken);
    }
  }, [isResearchFormDismissed, cookieData]);

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="CDEVFlJTyVZ2vM7ePugKgWsl_7Rd-MrfDv42u0vZ0B0" />
        <link rel="icon" href="favicon.ico" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_HOSTNAME}${router.asPath}`} key="canonical" />
        <link rel="manifest" href="manifest.json" />
      </Head>

      <Script id="phosphor-icons" src="https://unpkg.com/@phosphor-icons/web" async />

      <Script id="bootstrap" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

      <VmInitializer />

      {getLayout(<Component {...pageProps} />)}

      <Toaster />

      <CookiePrompt />

      <ResearchFormWizard />

      <div
        id="idos_container"
        style={
          !router.route.startsWith('/settings')
            ? ({
                position: 'absolute',
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                margin: 0,
                padding: 0,
                opacity: 0,
                overflow: 'hidden',
              } as React.CSSProperties)
            : undefined
        }
      />
    </>
  );
}
