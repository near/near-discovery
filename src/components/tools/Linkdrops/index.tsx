import { Flex, Switch, Text } from '@near-pagoda/ui';
import { Coins, ImageSquare } from '@phosphor-icons/react';
import Link from 'next/link';
import { useState } from 'react';

import type { Collection, Drops, FT } from '@/utils/types';

import CreateNFTDrop from './CreateNFTDrop';
import CreateTokenDrop from './CreateTokenDrop';
import ListTokenDrop from './ListTokenDrop';

const Linkdrops = ({
  user_fts,
  user_collections,
  drops,
  reloadFT,
  reloadNFT,
  reloadDrops,
}: {
  user_fts: FT[];
  user_collections: Collection[];
  drops: Drops[];
  reloadFT: (delay: number) => void;
  reloadNFT: (delay: number) => void;
  reloadDrops: (delay: number) => void;
}) => {
  const [selector, setSelector] = useState(false);

  return (
    <>
      <Text size="text-l"> Create a LinkDrop </Text>
      <Text size="text-s" style={{ marginBottom: 'var(--gap-s)' }}>
        This tool allows you to create drops that can be claimed by anyone through a simple web link
      </Text>

      <Flex as="label" align="center" style={{ fontSize: 'small' }}>
        Token
        <Switch
          onCheckedChange={(t) => setSelector(t)}
          iconOn={<ImageSquare weight="bold" />}
          iconOff={<Coins weight="bold" />}
        />
        NFT
      </Flex>
      {!selector && (
        <CreateTokenDrop
          user_fts={user_fts}
          reload={(delay) => {
            reloadFT(delay);
            reloadDrops(delay);
          }}
        />
      )}
      {selector && (
        <CreateNFTDrop
          user_collections={user_collections}
          reload={(delay) => {
            reloadNFT(delay);
            reloadDrops(delay);
          }}
        />
      )}
      <Text style={{ textAlign: 'right' }} size="text-s">
        Powered by <Link href="https://keypom.xyz">Keypom</Link>
      </Text>

      <ListTokenDrop drops={drops} />
    </>
  );
};

export default Linkdrops;
