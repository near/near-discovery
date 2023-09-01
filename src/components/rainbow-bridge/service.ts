import type { Transfer } from '@near-eth/client';

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

  const baseUrl = `https://backend.data-service.ref-finance.com/?ethAddress=${ethAddress}&nearAccountId=${nearAccountId}`;

  return fetch(baseUrl)
    .then(async (res) => {
      const parsedResult = (await res.json()) as TransferList;
      return {
        ...parsedResult,
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
