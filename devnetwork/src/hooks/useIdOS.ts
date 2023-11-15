import { idOS } from '@idos-network/idos-sdk';
import { useCallback, useEffect } from 'react';

import { useIdosStore } from '@/stores/idosStore';

export function useIdOS() {
  const setIdosStore = useIdosStore((state) => state.set);

  const init = useCallback(async () => {
    await new Promise<void>(async (resolve, reject) => {
      try {
        const idos = (await idOS.init({ container: '#idos_container' } as {
          nodeUrl: string;
          container: string;
        })) as any;
        setIdosStore({ idOS: idos });
        resolve();
      } catch (error: any) {
        console.error('Failed to initialize IDOS: ', error);
        reject();
      }
    });
  }, [setIdosStore]);

  useEffect(() => {
    init();
  }, [init, setIdosStore]);
  return idOS;
}
