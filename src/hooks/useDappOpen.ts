import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useDappStore } from '@/stores/dapp';

export default function useDappOpen() {
  const router = useRouter();
  const setDapp = useDappStore((store: any) => store.set);
  const open = useCallback((dapp: any, from: 'home' | 'quest') => {
    let _dapp = {} as any;
    if (from === 'quest') {
      _dapp = {
        dapp_network: [{ network_id: dapp.network_id, dapp_src: dapp.dapp_src }],
        default_network_id: dapp.network_id,
        name: dapp.dapp_name,
        logo: dapp.dapp_logo,
      };
      setDapp({ dapp: _dapp });
    } else {
      setDapp({ dapp });
    }

    router.push(dapp.route);
  }, []);
  return { open };
}
