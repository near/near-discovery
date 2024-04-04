import { useCallback } from 'react';

import { useSidebarLayoutEnabled } from '@/components/sidebar-navigation/hooks';
import { useNavigationStore } from '@/components/sidebar-navigation/store';
import type { PinnedApp } from '@/components/sidebar-navigation/utils';

type PinnedAppsGatewayEvent = {
  type: 'PINNED_APPS';
  app?: PinnedApp;
  action: 'FEATURE_ENABLED' | 'PINNED' | 'UNPINNED';
};

type GenericGatewayEvent = {
  type: 'GENERIC';
  data: any;
};

type GatewayEvent = GenericGatewayEvent | PinnedAppsGatewayEvent;

const COMPONENT_AUTHOR_ID_WHITELIST = ['near', 'discom.testnet', 'discom-dev.testnet'];

export function useGatewayEvents() {
  const { sidebarLayoutEnabled } = useSidebarLayoutEnabled();
  const modifyPinnedApps = useNavigationStore((store) => store.modifyPinnedApps);

  const handleGenericEvent = useCallback((event: GenericGatewayEvent) => {
    /* 
      This event doesn't have a use case right now, but it serves as an example of 
      how we could implement different event types in the future.
    */

    console.log('Generic gateway event recorded with data:', event);
  }, []);

  const handlePinnedAppsEvent = useCallback(
    (event: PinnedAppsGatewayEvent) => {
      if (event.action === 'FEATURE_ENABLED') {
        return sidebarLayoutEnabled;
      } else if (event.app) {
        modifyPinnedApps(event.app, event.action);
      } else {
        console.error('Unimplemented pinned apps gateway event recorded:', event);
      }
    },
    [modifyPinnedApps, sidebarLayoutEnabled],
  );

  const emitGatewayEvent = useCallback(
    (event: GatewayEvent) => {
      switch (event.type) {
        case 'GENERIC':
          return handleGenericEvent(event);
        case 'PINNED_APPS':
          return handlePinnedAppsEvent(event);
        default:
          console.error('Unimplemented gateway event recorded:', event);
      }
    },
    [handleGenericEvent, handlePinnedAppsEvent],
  );

  const shouldPassGatewayEventProps = useCallback((componentAuthorId: string) => {
    /*
      When rendering components we might not trust (eg: pages/[componentAccountId]/widget/[componentName].tsx), 
      we can use this method to determine if should pass gateway event props to the component.
    */

    return COMPONENT_AUTHOR_ID_WHITELIST.includes(componentAuthorId);
  }, []);

  /*
    Since the exports of this hook will be passed into BOS/VM components, it's important 
    to only expose methods that rely on useCallback() to reduce re-renders for the VM.
  */

  return { emitGatewayEvent, shouldPassGatewayEventProps };
}
