import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';

import type { InviteCodeRecord } from '../types';

export default function () {
  const { account } = useAccount();
  const [list, setList] = useState<InviteCodeRecord[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/dapdap/invite/get-address-code/${account}`);
        const data = await res.json();
        setList(data?.data?.map((record: InviteCodeRecord) => ({ code: record.code, is_used: record.is_used })));
      } finally {
        setLoading(false);
      }
    };
    if (account) getList();
  }, [account]);

  return { list, loading };
}
