import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useCallback, useEffect, useState } from 'react';

import { network } from '@/config';
import { getKeypomKeys } from '@/utils/linkdrops';
import type { Drops, KeypomKey } from '@/utils/types';

const KEYPOM_CONTRACT_ADDRESS = network.linkdrop;

const useLinkdrops = () => {
  const { signedAccountId, viewFunction } = useWalletSelector();
  const [drops, setDrops] = useState<Drops[]>([]);

  const fetchDropData = useCallback(async () => {
    if (!signedAccountId) return;

    const fetchedDrops: Drops[] = (await viewFunction({
      contractId: KEYPOM_CONTRACT_ADDRESS,
      method: 'get_drops_for_owner',
      args: { account_id: signedAccountId },
    })) as any;

    const fetchDropInformation = async () => {
      const fetchedDropsWithKeys = await Promise.all(
        fetchedDrops.map(async (drop) => {
          if (
            !(
              drop.metadata &&
              JSON.parse(drop.metadata).dropName &&
              getKeypomKeys(JSON.parse(drop.metadata).dropName).length > 0
            )
          ) {
            return null;
          }

          const keypomKeys: KeypomKey[] = (await viewFunction({
            contractId: KEYPOM_CONTRACT_ADDRESS,
            method: 'get_keys_for_drop',
            args: { drop_id: drop.drop_id },
          })) as any;

          const localKeys = getKeypomKeys(JSON.parse(drop.metadata).dropName);

          const unclaimedKeys = localKeys.filter((localKey) =>
            keypomKeys.some((keypomKey) => keypomKey.pk === localKey.public),
          );

          if (unclaimedKeys.length > 0) {
            return { ...drop, keys: unclaimedKeys };
          }

          return null;
        }),
      );

      return fetchedDropsWithKeys.filter((item) => item !== null) as Drops[];
    };

    const data = await fetchDropInformation();

    setDrops(data);
  }, [viewFunction, signedAccountId]);

  useEffect(() => {
    fetchDropData();
  }, [fetchDropData]);

  return { drops, reloadLinkdrops: fetchDropData };
};

export default useLinkdrops;
