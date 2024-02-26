import { idOS } from '@idos-network/idos-sdk';
import { useCallback, useEffect } from 'react';

import { useIdosStore } from '@/stores/idosStore';
import { recordHandledError } from '@/utils/analytics';

export function useIdOS() {
  const setIdosStore = useIdosStore((state) => state.set);
  const idosStore = useIdosStore((state) => state.idOS);

  const init = useCallback(async () => {
    try {
      const idos = (await idOS.init({ container: '#idos_container' } as {
        nodeUrl: string;
        container: string;
      })) as any;
      setIdosStore({ idOS: idos });
    } catch (error: any) {
      const scope = 'Failed to initialize IDOS:';
      console.error(scope, error);
      recordHandledError({ scope, message: error.message || error });
    }
  }, [setIdosStore]);

  useEffect(() => {
    if (!idosStore) {
      init();
    }
  }, [idosStore, init, setIdosStore]);
  return idOS;
}
