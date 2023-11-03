import { idOS } from '@idos-network/idos-sdk';
import { useCallback, useEffect, useState } from 'react';

import { useAuthStore } from '@/stores/auth';
import { useIdosStore } from '@/stores/idosStore';

export function useIdOS() {
  const near = useAuthStore((store) => store.vmNear);
  const setIdosStore = useIdosStore((state) => state.set);

  const setSigner = useCallback(async () => {
    if (!near || !idOS) {
      return;
    }
    let currentUser;
    const wallet = await (await near.selector).wallet();
    await new Promise<void>(async (resolve, reject) => {
      try {
        console.log('waiting for signature...');
        currentUser = await idOS?.setSigner("NEAR", wallet);
        console.log('Promise useIdOS currentUser', currentUser);
        resolve();
      } catch (error: any) {
        const errorMessage = error.message ? error.message : 'unknown';
        console.error('Failed to get credentials: ', error);
        reject();
      }
    });
    console.log('useIdOS currentUser', currentUser);
    return currentUser;
    // setIdosUser(currentUser);
  }, [near]);


  useEffect(() => {
    // const init = async () => await idOS.init({ container: '#idos_container', nodeUrl: 'https://nodes.staging.idos.network' });
    const init = async () => await idOS.init({ container: '#idos_container', nodeUrl: 'https://nodes.idos.network' });
    init();
  }, []);

  useEffect(() => {
    setSigner();
  }, [setSigner]);

  useEffect(() => {
    if (!idOS) return;
    console.log('useIdOS idOS', idOS);
    console.log('useIdOS idOS.near', idOS.near);
    setIdosStore({ idOS });
  }, [setIdosStore]);
  return idOS;
}
