import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { BosLoaderBanner } from '@/components/client/BosLoaderBanner';
import { VmWidgetWrapper } from '@/components/client/VmWidgetWrapper';
import { Navigation } from '@/components/navigation/Navigation';
import { useFlags } from '@/hooks/useFlags';
import { useHashUrlBackwardsCompatibility } from '@/hooks/useHashUrlBackwardsCompatibility';
import { useWidgets } from '@/hooks/useWidgets';
import { useAuthStore } from '@/stores/auth';
import { useComponentRedirectMapStore } from '@/stores/component-redirect-map';
import { useCurrentWidgetStore } from '@/stores/current-widget';
import { recordClick, recordPageView } from '@/utils/analytics';
import { styleZendesk } from '@/utils/zendesk';

export default function ViewComponentPage() {
  const router = useRouter();
  const setWidgetSrc = useCurrentWidgetStore((store) => store.setWidgetSrc);
  const widgetSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
  const [widgetProps, setWidgetProps] = useState<Record<string, unknown>>({});
  const authStore = useAuthStore();
  const widgets = useWidgets();

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

      <Navigation />

      <BosLoaderBanner />

      <div className="container-xl" onPointerUp={recordClick}>
        <div className="row">
          <div
            className="d-inline-block position-relative overflow-hidden"
            style={{
              paddingTop: 'var(--body-top-padding)',
            }}
          >
            <VmWidgetWrapper
              key={widgets.wrapper}
              src={widgets.wrapper}
              props={{
                children: (
                  <VmWidgetWrapper
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
        </div>
      </div>
    </>
  );
}
