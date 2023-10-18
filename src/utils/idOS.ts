import { idOS } from '@idos-network/idos-sdk';

import { openToast } from '@/components/lib/Toast';

export const defaultIdosInitOptions = {
  container: '#idos_container',
  nodeUrl: 'https://nodes.playground.idos.network',
};

export async function idOSInit(options = defaultIdosInitOptions) {
  try {
    const idos = await idOS.init(options);
    return idos;
  } catch (error: any) {
    const errorMessage = error.message ? error.message : 'unknown';
    console.log('Failed to initialize IDOS: ', error);
    openToast({
      type: 'ERROR',
      title: 'Failed to initialize IDOS',
      description: `${errorMessage}`,
    });
  }
}
