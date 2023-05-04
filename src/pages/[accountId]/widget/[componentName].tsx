import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { VmWidgetWrapper } from '@/components/client/VmWidgetWrapper';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useWidgets } from '@/hooks/useWidgets';
import { useAuthStore } from '@/stores/auth';
import { useCurrentWidgetStore } from '@/stores/current-widget';
import { recordClick, recordPageView } from '@/utils/analytics';
import type { NextPageWithLayout } from '@/utils/types';
import { styleZendesk } from '@/utils/zendesk';

const ViewComponentPage: NextPageWithLayout = () => {
  const router = useRouter();
  const setWidgetSrc = useCurrentWidgetStore((store) => store.setWidgetSrc);
  const widgetSrc = `${router.query.accountId}/widget/${router.query.componentName}`;
  const [widgetProps, setWidgetProps] = useState<Record<string, unknown>>({});
  const authStore = useAuthStore();
  const widgets = useWidgets();

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
    <div className="container-xl" onPointerUp={recordClick}>
      <div className="row">
        <div
          className="d-inline-block position-relative overflow-hidden"
          style={{
            paddingTop: 'var(--body-top-padding)',
          }}
        >
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
        </div>
      </div>
    </div>
  );
};

ViewComponentPage.getLayout = useDefaultLayout;

export default ViewComponentPage;
