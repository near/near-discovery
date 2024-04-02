import { useCallback } from 'react';

import { useNavigationStore } from '@/components/sidebar-navigation/store';
import type { PinnedApp } from '@/components/sidebar-navigation/utils';

type PinnedAppsGatewayEvent = {
  type: 'PINNED_APPS';
  app: PinnedApp;
  modification: 'PINNED' | 'UNPINNED';
};

type GenericGatewayEvent = {
  type: 'GENERIC';
  data: any;
};

type GatewayEvent = GenericGatewayEvent | PinnedAppsGatewayEvent;

export function useGatewayEvents() {
  /*
    Since the exports of this hook will be passed into BOS/VM components, it's important 
    to only expose methods that rely on useCallback() to reduce re-renders for the VM.
  */

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
      modifyPinnedApps(event.app, event.modification);
    },
    [modifyPinnedApps],
  );

  const emitGatewayEvent = useCallback(
    (event: GatewayEvent) => {
      switch (event.type) {
        case 'GENERIC':
          handleGenericEvent(event);
          break;
        case 'PINNED_APPS':
          handlePinnedAppsEvent(event);
          break;
        default:
          console.error('Unimplemented gateway event recorded:', event);
      }
    },
    [handleGenericEvent, handlePinnedAppsEvent],
  );

  return { emitGatewayEvent };
}
