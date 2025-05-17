import '@/styles/globals.css';
import '@near-pagoda/ui/globals.css';
import '@near-pagoda/ui/theme.css';
import '@near-pagoda/ui/lib.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@near-wallet-selector/modal-ui/styles.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

import { openToast, PagodaUiProvider, Toaster } from '@near-pagoda/ui';
import Gleap from 'gleap';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import { useState } from 'react';

import { CookiePrompt } from '@/components/CookiePrompt';
import { ResearchFormWizard } from '@/components/research-form-wizard/ResearchFormWizard';
import { NearContext, Wallet } from '@/components/wallet-selector/WalletSelector';
import { gleapSdkToken, networkId, signInContractId } from '@/config';
import { useBosLoaderInitializer } from '@/hooks/useBosLoaderInitializer';
import { useHashUrlBackwardsCompatibility } from '@/hooks/useHashUrlBackwardsCompatibility';
import { useCookieStore } from '@/stores/cookieData';
import { useResearchWizardStore } from '@/stores/researchWizard';
import { initPostHog, PostHogTrackingProvider } from '@/utils/analytics-posthog';
import type { NextPageWithLayout } from '@/utils/types';
import { styleZendesk } from '@/utils/zendesk';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

if (typeof window !== 'undefined') {
  if (gleapSdkToken) Gleap.initialize(gleapSdkToken);
}

function initializeGleap() {
  if (typeof window === 'undefined') return;

  // Extend the window object with a custom property
  interface GleapWindow extends Window {
    __gleapInitialized?: boolean;
  }

  const gleapWindow = window as GleapWindow;

  if (gleapWindow.__gleapInitialized) return;

  if (!gleapSdkToken) {
    console.warn('Gleap SDK token is not set. Gleap will not be initialized.');
    return;
  }

  Gleap.initialize(gleapSdkToken);
  gleapWindow.__gleapInitialized = true;

  // NEAR-247: Sanitize open-url messages from Gleap
  Gleap.setUrlHandler((url: string, newTab?: boolean) => {
    try {
      const parsed = new URL(url, window.location.href);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        console.warn('Blocked invalid Gleap navigation to unsafe protocol:', parsed.protocol);
        return;
      }
      if (newTab) {
        window.open(parsed.href, '_blank')?.focus();
      } else {
        window.location.href = parsed.href;
      }
    } catch (e) {
      console.warn('Blocked invalid Gleap URL:', url, e);
    }
  });
}

const wallet = new Wallet({ networkId: networkId, createAccessKeyFor: signInContractId });
initPostHog();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useBosLoaderInitializer();
  useHashUrlBackwardsCompatibility();
  const checkCookieData = useCookieStore((state) => state.checkCookieData);
  const cookieData = useCookieStore((state) => state.cookieData);
  const isResearchFormDismissed = useResearchWizardStore((state) => state.isResearchFormDismissed);
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const [signedAccountId, setSignedAccountId] = useState('');

  // Gleap initialization
  useEffect(() => {
    initializeGleap();
  }, []);

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  useEffect(() => {
    const referred_from_wallet = document.referrer.indexOf('https://wallet.near.org/') !== -1;
    const isFirebaseError = router.query.reason && referred_from_wallet;
    const msg = Array.isArray(router.query.reason) ? router.query.reason[0] : router.query.reason;
    if (isFirebaseError) {
      openToast({
        title: 'An Error Occurred During Fast Authentication',
        type: 'error',
        description: msg || '',
        duration: 5000,
      });
    }
  }, [router.query]);

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

  // needed by fast auth to show the wallet selector when the user chooses "use a wallet"
  useEffect(() => {
    const handleShowWalletSelector = (e: MessageEvent<{ showWalletSelector: boolean }>) => {
      if (e.data.showWalletSelector) {
        wallet.signIn();
      }
    };

    window.addEventListener('message', handleShowWalletSelector, false);
    return () => {
      window.removeEventListener('message', handleShowWalletSelector, false);
    };
  }, []);

  useEffect(() => {
    if (!cookieData || !isResearchFormDismissed) {
      Gleap.showFeedbackButton(false);
    } else {
      Gleap.showFeedbackButton(true);
    }
  }, [isResearchFormDismissed, cookieData]);

  useEffect(() => {
    checkCookieData();
  }, [checkCookieData]);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <PagodaUiProvider
        value={{
          routerPrefetch: router.prefetch,
          routerPush: router.push,
          Link,
        }}
      >
        <Head>
          <meta name="google-site-verification" content="CDEVFlJTyVZ2vM7ePugKgWsl_7Rd-MrfDv42u0vZ0B0" />
          <link rel="icon" href="favicon.ico" />
          <link rel="canonical" href={`${process.env.NEXT_PUBLIC_HOSTNAME}${router.asPath}`} key="canonical" />
          <link rel="manifest" href="manifest.json" />
        </Head>

        <Script id="phosphor-icons" src="https://unpkg.com/@phosphor-icons/web" async />

        <Script id="bootstrap" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

        <PostHogTrackingProvider>{getLayout(<Component {...pageProps} />)}</PostHogTrackingProvider>

        <Toaster />

        <CookiePrompt />

        <ResearchFormWizard />
      </PagodaUiProvider>
    </NearContext.Provider>
  );
}
