import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { VmWidgetWrapper } from '@/components/client/VmWidgetWrapper';
import { NavigationWrapper } from '@/components/navigation/org/NavigationWrapper';
import { useFlags } from '@/hooks/useFlags';
import { useHashUrlBackwardsCompatibility } from '@/hooks/useHashUrlBackwardsCompatibility';
import useRedirectMap from '@/hooks/useRedirectMap';
import { useWidgets } from '@/hooks/useWidgets';
import { useAuthStore } from '@/stores/auth';
import { useCurrentWidgetStore } from '@/stores/current-widget';
import { recordClick, recordPageView } from '@/utils/analytics';
import { styleZendesk } from '@/utils/zendesk';

export default function ViewComponentPage() {
  const [shouldWaitForMap, redirectMap, loaderError, loaderUrl] = useRedirectMap();
  const router = useRouter();
  const setWidgetSrc = useCurrentWidgetStore((store) => store.setWidgetSrc);
  const widgetSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
  const [widgetProps, setWidgetProps] = useState<Record<string, unknown>>({});
  const authStore = useAuthStore();
  const widgets = useWidgets();
  const [, setFlags] = useFlags();

  useHashUrlBackwardsCompatibility();

  useEffect(() => {
    setWidgetSrc(widgetSrc);
  }, [setWidgetSrc, widgetSrc]);

  useEffect(() => {
    setWidgetProps(router.query);
  }, [router.query]);

  useEffect(() => {
    // Displays the Zendesk widget only if user is signed in and on the home page
    if (!window.zE) return;
    if (!authStore.signedIn || !!widgetSrc) {
      window.zE('webWidget', 'hide');
      return;
    }
    localStorage.setItem('accountId', authStore.accountId);
    window.zE('webWidget', 'show');
  }, [authStore.accountId, authStore.signedIn, widgetSrc]);

  useEffect(() => {
    setTimeout(() => {
      recordPageView(widgetSrc);
    }, 1);
  }, [widgetSrc]);

  useEffect(() => {
    const interval = setInterval(zendeskCheck, 20);

    function zendeskCheck() {
      //once the zendesk widget comes online, style it
      const zwFrame = document.getElementById('launcher') as HTMLIFrameElement | null;
      const zwEmbed = zwFrame?.contentDocument?.getElementById('Embed');
      const zwButton = zwEmbed?.getElementsByTagName('button')[0];
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
        {/* TODO */}
        {/* <title>{props.meta.title}</title>
        <meta name="description" content={props.meta.description} />
        <meta property="og:title" content={props.meta.title} />
        <meta property="og:description" content={props.meta.description} /> */}
      </Head>

      <NavigationWrapper />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onPointerUp={recordClick}
      >
        {loaderUrl && (
          <div
            style={{
              backgroundColor: '#FFF2CD',
              color: '#664D04',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '2rem',
              columnGap: '8px',
            }}
          >
            <span>Loading components from: {loaderUrl}</span>

            <button className="btn btn-outline" onClick={() => setFlags({ bosLoaderUrl: undefined })}>
              <i className="bi bi-x" />
            </button>
          </div>
        )}
        {loaderError && (
          <div style={{ padding: '16px' }}>
            BOS Loader fetch error, see console logs. CORS errors may be misleading and mean your endpoint cannot be
            reached
          </div>
        )}
        <div className="container-xl">
          <div className="row">
            <div
              className="d-inline-block position-relative overflow-hidden"
              style={{
                paddingTop: 'var(--body-top-padding)',
              }}
            >
              {(!shouldWaitForMap || redirectMap) && (
                <div>
                  <VmWidgetWrapper
                    config={{ redirectMap: redirectMap }}
                    key={widgets.wrapper}
                    src={widgets.wrapper}
                    props={{
                      children: (
                        <VmWidgetWrapper
                          config={{ redirectMap: redirectMap }}
                          key={widgets.tosCheck}
                          src={widgets.tosCheck}
                          props={{
                            logOut: authStore.logOut,
                            targetProps: widgetProps,
                            targetComponent: widgetSrc,
                            tosName: widgets.tosContent,
                          }}
                        />
                      ),
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
