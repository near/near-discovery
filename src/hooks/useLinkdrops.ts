import { useCallback, useContext, useEffect, useState } from 'react';

import { NearContext } from '@/components/wallet-selector/WalletSelector';
import { network } from '@/config';
import { getKeypomKeys } from '@/utils/linkdrops';
import type { Drops, KeypomKey } from '@/utils/types';

const KEYPOM_CONTRACT_ADDRESS = network.linkdrop;

const useLinkdrops = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [drops, setDrops] = useState<Drops[]>([]);

  const fetchDropData = useCallback(async () => {
    if (!wallet || !signedAccountId) return;

    const fetchedDrops: Drops[] = await wallet.viewMethod({
      contractId: KEYPOM_CONTRACT_ADDRESS,
      method: 'get_drops_for_owner',
      args: { account_id: signedAccountId },
    });

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

          const keypomKeys: KeypomKey[] = await wallet.viewMethod({
            contractId: KEYPOM_CONTRACT_ADDRESS,
            method: 'get_keys_for_drop',
            args: { drop_id: drop.drop_id },
          });

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
  }, [wallet, signedAccountId]);

  useEffect(() => {
    fetchDropData();
  }, [fetchDropData]);

  return { drops, reloadLinkdrops: fetchDropData };
};

export default useLinkdrops;
