import { useContext, useEffect, useState } from 'react';

import { NearContext } from '@/components/WalletSelector';
import { getKeypomKeys } from '@/utils/linkdrops';
import type { Drops, KeypomKey } from '@/utils/types';

const useLinkdrops = () => {
  const { signedAccountId } = useContext(NearContext);
  const [drops, setDrops] = useState<Drops[]>([]);

  const { wallet } = useContext(NearContext);

  useEffect(() => {
    const fetchDropData = async () => {
      if (!wallet || !signedAccountId) return;

      const fetchedDrops: Drops[] = await wallet.viewMethod({
        contractId: 'v2.keypom.near',
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
              contractId: 'v2.keypom.near',
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

        return fetchedDropsWithKeys;
      };

      const data = (await fetchDropInformation()).filter((item) => item !== null) as Drops[];

      setDrops(data);
    };

    fetchDropData();
  }, [wallet, signedAccountId]);

  return drops;
};

export default useLinkdrops;
