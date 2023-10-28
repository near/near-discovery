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
import { useEffect, useState } from 'react';

import { Toaster } from '@/components/lib/Toast';
import { useBosLoaderInitializer } from '@/hooks/useBosLoaderInitializer';
import { useClickTracking } from '@/hooks/useClickTracking';
import { useHashUrlBackwardsCompatibility } from '@/hooks/useHashUrlBackwardsCompatibility';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import useTokenPrice from '@/hooks/useTokenPrice';
import useAccount from '@/hooks/useAccount';
import { useAuthStore } from '@/stores/auth';
import { init as initializeAnalytics } from '@/utils/analytics';
import type { NextPageWithLayout } from '@/utils/types';
import { styleZendesk } from '@/utils/zendesk';
import * as http from '@/utils/http';
import { getAccessToken, insertedAccessKey } from '@/apis';
import InviteCodePage from './invite-code';

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
  const { initializePrice } = useTokenPrice();
  const getLayout = Component.getLayout ?? ((page) => page);
  const [authStatus, setAuthStatus] = useState(-1); // -1 unknow; 1 authed; 0 unauthed
  const router = useRouter();
  const authStore = useAuthStore();
  const { account } = useAccount();
  const componentSrc = router.query;

  useEffect(() => {
    const check = async () => {
      const _account = window.localStorage.getItem('LOGINED_ACCOUNT');
      if (account && (_account || '').toLowerCase() === (account || '').toLowerCase()) {
        setAuthStatus(1);
        return;
      }
      if (!account) {
        setAuthStatus(0);
        return;
      }
      try {
        const res = await http.get(`/api/invite/check-address/${account}`);
        if (res.data?.is_activated) {
          await getAccessToken(account);
          window.localStorage.setItem('LOGINED_ACCOUNT', account);
          setAuthStatus(1);
          return;
        }
        setAuthStatus(0);
      } catch (err) {
        setAuthStatus(0);
      }
    };
    if (router.pathname === 'uniswap') {
      setAuthStatus(1);
    } else {
      check();
    }
  }, [account]);
  useEffect(() => {
    initializeAnalytics();
    initializePrice();
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

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="CDEVFlJTyVZ2vM7ePugKgWsl_7Rd-MrfDv42u0vZ0B0" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_HOSTNAME}/near/widget/NearOrg.HomePage`}
          key="canonical"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>DapDap</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>

      <Script id="phosphor-icons" src="https://unpkg.com/@phosphor-icons/web@2.0.3" async />

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PR996H5E9T"></Script>
      <Script id="ga-config">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PR996H5E9T');`}
      </Script>

      <Script
        src="https://static.zdassets.com/ekr/snippet.js?key=1736c8d0-1d86-4080-b622-12accfdb74ca"
        id="ze-snippet"
        async
      />

      <Script id="zendesk-config">
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

      <VmInitializer />
      {getLayout(authStatus === 1 ? <Component {...pageProps} /> : authStatus === 0 ? <InviteCodePage /> : <div />)}
      <Toaster />
    </>
  );
}
