import { isValidAttribute } from 'dompurify';
import { mapValues } from 'lodash';
import { EthersProviderContext, useInitNear, Widget } from 'near-social-vm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

import { useEthersProviderContext } from '@/data/web3';
import { cookiePreferences, optOut, recordHandledError, recordWalletConnect } from '@/utils/analytics';
import { commitModalBypassAuthorIds, commitModalBypassSources, isLocalEnvironment, networkId } from '@/utils/config';

import { NearContext } from '../WalletSelector';

export default function Component(props: any) {
  const ethersContext = useEthersProviderContext();
  const { wallet } = useContext(NearContext);
  const { initNear } = useInitNear();
  const router = useRouter();

  useEffect(() => {
    wallet &&
      wallet.selector &&
      initNear &&
      initNear({
        networkId,
        walletConnectCallback: recordWalletConnect,
        errorCallback: recordHandledError,
        selector: wallet.selector,
        customElements: {
          Link: ({ to, href, ...rest }: { to: string | object | undefined; href: string | object }) => {
            const cleanProps = mapValues({ to, href, ...rest }, (val: any, key: string) => {
              if (!['to', 'href'].includes(key)) return val;
              if (key === 'href' && !val) val = to;
              const isAtrValid = typeof val === 'string' && isValidAttribute('a', 'href', val);
              let linkValue;
              if (isAtrValid) {
                if (val.startsWith('?')) {
                  const currentParams = new URLSearchParams(
                    Object.entries(router.query).reduce((acc, [key, value]) => {
                      if (typeof value === 'string') {
                        acc[key] = value;
                      }
                      return acc;
                    }, {} as { [key: string]: string }), // Add index signature to the object type
                  );
                  const newParams = new URLSearchParams(val);
                  newParams.forEach((value, key) => {
                    currentParams.set(key, value);
                  });

                  linkValue = `?${currentParams.toString()}`;
                } else {
                  linkValue = val;
                }
              } else {
                linkValue = 'about:blank';
              }
              return linkValue;
            });
            return <Link {...cleanProps} />;
          },
          AnalyticsCookieConsent: ({ all, onlyRequired }: { all: boolean; onlyRequired: boolean }) => {
            localStorage.setItem('cookiesAcknowledged', all ? cookiePreferences.all : cookiePreferences.onlyRequired);
            optOut(onlyRequired);
            return <></>;
          },
        },
        features: {
          commitModalBypass: {
            authorIds: commitModalBypassAuthorIds,
            sources: commitModalBypassSources,
          },
          enableComponentSrcDataKey: true,
          enableWidgetSrcWithCodeOverride: isLocalEnvironment,
        },
      });
  }, [wallet, initNear, router.query]);

  return (
    <div style={{ position: 'relative' }}>
      <EthersProviderContext.Provider value={ethersContext}>
        <Widget {...props} />
      </EthersProviderContext.Provider>
    </div>
  );
}
