import '@/styles/theme.css';
import '@/styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@near-wallet-selector/modal-ui/styles.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { Provider } from 'react-redux';

import Initializer from '@/components/Initializer';
import { Toaster } from '@/components/lib/Toast';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import type { NextPageWithLayout } from '@/utils/types';

import { store } from '../redux/store';

const meta = {
  title: 'NEAR',
  description: "Let's build decentralized experiences.",
  image: `${process.env.NEXT_PUBLIC_HOSTNAME}/bos-meta.png`,
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  usePageAnalytics();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="CDEVFlJTyVZ2vM7ePugKgWsl_7Rd-MrfDv42u0vZ0B0" />
        <meta content={meta.image} name="twitter:image" />
        <meta content={meta.image} property="og:image" />
      </Head>

      <Script id="phosphor-icons" src="https://unpkg.com/@phosphor-icons/web@2.0.3" async />

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
              launcher: {
                label: { '*': ' ' },
              },
            },
          };
        `}
      </Script>
      <Script id="bootstrap" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />

      <Provider store={store}>
        <Initializer>{getLayout(<Component {...pageProps} />)}</Initializer>
        <Toaster />
      </Provider>
    </>
  );
}
