import { useContext, useEffect, useState } from 'react';

import { NearContext } from '@/components/WalletSelector';
import { getKeypomKeys } from '@/utils/linkdrops';
import type { Drops } from '@/utils/types';

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

      const filteredDrops = fetchedDrops.filter(
        (drop) =>
          drop.metadata &&
          JSON.parse(drop.metadata).dropName &&
          getKeypomKeys(JSON.parse(drop.metadata).dropName).length > 0,
      );

      const fetchedInformationDrops = await Promise.all(
        filteredDrops.map(async (drop) => {
          const information = await wallet.viewMethod({
            contractId: 'v2.keypom.near',
            method: 'get_keys_for_drop',
            args: { drop_id: drop.drop_id },
          });
          return { ...drop, information };
        }),
      );

      const localDataDrops = fetchedInformationDrops.map((drop) => ({
        ...drop,
        keys: getKeypomKeys(JSON.parse(drop.metadata).dropName),
      }));

      setDrops(localDataDrops);
    };

    fetchDropData();
  }, [wallet, signedAccountId]);

  return drops;
};

export default useLinkdrops;
