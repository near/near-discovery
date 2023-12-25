import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { useDappStore } from '@/stores/dapp';
import { get } from '@/utils/http';

export default function useDappOpen() {
  const router = useRouter();
  const setDapp = useDappStore((store: any) => store.set);
  const open = useCallback(async (dapp: any, from: 'home' | 'quest' | 'alldapps') => {
    let _dapp = {} as any;
    if (from === 'quest') {
      _dapp = {
        dapp_network: [{ network_id: dapp.network_id, dapp_src: dapp.dapp_src }],
        default_network_id: dapp.network_id,
        name: dapp.dapp_name,
        logo: dapp.dapp_logo,
        route: dapp.route,
      };
      setDapp({ dapp: _dapp });
    }
    if (from === 'home') {
      _dapp.route = dapp.route;
      setDapp({ dapp });
    }

    if (from === 'alldapps') {
      const result = await get(`${QUEST_PATH}/api/dapp?id=${dapp.id}`);
      _dapp = result.data;
      setDapp({ dapp: _dapp });
    }

    router.push(_dapp.route);
  }, []);
  return { open };
}
