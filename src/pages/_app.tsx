import '@/styles/globals.css';
import '@near-wallet-selector/modal-ui/styles.css';
import '@near-pagoda/ui/globals.css';
import '@near-pagoda/ui/theme.css';
import '@near-pagoda/ui/lib.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

import { openToast, PagodaUiProvider, Toaster } from '@near-pagoda/ui';
import { setupBitteWallet } from '@near-wallet-selector/bitte-wallet';
import { setupEthereumWallets } from '@near-wallet-selector/ethereum-wallets';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupHotWallet } from '@near-wallet-selector/hot-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupMeteorWalletApp } from '@near-wallet-selector/meteor-wallet-app';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearMobileWallet } from '@near-wallet-selector/near-mobile-wallet';
import { setupNightly } from '@near-wallet-selector/nightly';
import { WalletSelectorProvider } from '@near-wallet-selector/react-hook';
import { setupSender } from '@near-wallet-selector/sender';
import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet';
import Gleap from 'gleap';
import { setupFastAuthWallet } from 'near-fastauth-wallet';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import { CookiePrompt } from '@/components/CookiePrompt';
import { ResearchFormWizard } from '@/components/research-form-wizard/ResearchFormWizard';
import { wagmiConfig, web3Modal } from '@/components/wallet-selector/web3modal';
import { gleapSdkToken, networkId, signInContractId } from '@/config';
import { useBosLoaderInitializer } from '@/hooks/useBosLoaderInitializer';
import { useHashUrlBackwardsCompatibility } from '@/hooks/useHashUrlBackwardsCompatibility';
import { useCookieStore } from '@/stores/cookieData';
import { useResearchWizardStore } from '@/stores/researchWizard';
import { initPostHog, PostHogTrackingProvider } from '@/utils/analytics-posthog';
import type { NextPageWithLayout } from '@/utils/types';
import { styleZendesk } from '@/utils/zendesk';

const walletSelectorConfig = {
  network: networkId,
  createAccessKeyFor: signInContractId,
  modules: [
    setupFastAuthWallet({
      walletUrl:
        networkId === 'testnet' ? 'https://wallet.testnet.near.org/fastauth' : 'https://wallet.near.org/fastauth',
      relayerUrl:
        networkId === 'testnet' ? 'http://34.70.226.83:3030/relay' : 'https://near-relayer-mainnet.api.pagoda.co/relay',
    }),
    setupEthereumWallets({ wagmiConfig, web3Modal: web3Modal as any, alwaysOnboardDuringSignIn: true }),
    setupMeteorWallet(),
    setupMeteorWalletApp({ contractId: signInContractId }),
    setupBitteWallet(),
    setupHotWallet(),
    setupHereWallet(),
    setupMyNearWallet(),
    setupNearMobileWallet(),
    setupSender(),
    setupNightly(),
    setupWelldoneWallet(),
    setupLedger(),
  ],
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

if (typeof window !== 'undefined') {
  if (gleapSdkToken) Gleap.initialize(gleapSdkToken);
}

initPostHog();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useBosLoaderInitializer();
  useHashUrlBackwardsCompatibility();
  const checkCookieData = useCookieStore((state) => state.checkCookieData);
  const cookieData = useCookieStore((state) => state.cookieData);
  const isResearchFormDismissed = useResearchWizardStore((state) => state.isResearchFormDismissed);
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

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
    <WalletSelectorProvider config={walletSelectorConfig as any}>
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
    </WalletSelectorProvider>
  );
}
