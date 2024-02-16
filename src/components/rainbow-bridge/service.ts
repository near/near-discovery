import type { Transfer } from '@near-eth/client';
import { useEffect,useState } from 'react';

export interface TransferList {
  code: number;
  data: Transfer[];
}

export const fetchAllTransfers = async (nearAccountId: string, ethAddress: string) => {
  if (!ethAddress || !nearAccountId)
    return {
      code: 0,
      data: [],
      update: 0,
    };

  const baseUrl = `https://api.data-service.ref.finance/rainbow/get_transfers?ethAddress=${ethAddress}&nearAccountId=${nearAccountId}`;

  return fetch(baseUrl)
    .then(async (res) => {
      const parsedResult = await res.json();
      console.log('parsedResult: ', parsedResult);

      const transferList = parsedResult.map((r: any) => r.transfer_json);

      return {
        data: transferList,
        code: 1,
        update: 1,
      };
    })
    .catch(() => {
      return {
        code: 0,
        data: [],
        update: 0,
      };
    });
};

export const fetchTokenPrice = async () => {
  return await fetch('https://indexer.ref.finance/list-token-price').then((res) => res.json());
};

export const useTokenPrice = () => {
  const [priceMap, setPriceMap] = useState<any>({});

  useEffect(() => {
    fetchTokenPrice().then(setPriceMap);
  }, []);

  return priceMap;
};
