import { useCallback, useEffect, useState } from 'react';

import { QUEST_PATH } from '@/config/quest';
import { get } from '@/utils/http';

export default function useAuthConfig() {
  const [config, setConfig] = useState<any>();
  const getAuthConfig = useCallback(async () => {
    const res = await get(`${QUEST_PATH}/config`);
    setConfig(res.data);
  }, []);

  useEffect(() => {
    getAuthConfig();
  }, []);

  return config;
}
