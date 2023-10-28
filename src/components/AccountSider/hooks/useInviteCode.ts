import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import * as http from '@/utils/http';

import type { InviteCodeRecord } from '../types';

export default function (show: boolean) {
  const { account } = useAccount();
  const [list, setList] = useState<InviteCodeRecord[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const res = await http.get(`/api/invite/get-address-code/${account}`);
        setList(res?.data?.map((record: InviteCodeRecord) => ({ code: record.code, is_used: record.is_used })));
      } finally {
        setLoading(false);
      }
    };
    if (account && show) getList();
  }, [account, show]);

  return { list, loading };
}
