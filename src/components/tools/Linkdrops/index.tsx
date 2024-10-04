import { Flex, Switch, Text } from '@near-pagoda/ui';
import { Coins, ImageSquare } from '@phosphor-icons/react';
import { useState } from 'react';

import type { Drops } from '@/utils/types';

import CreateNFTDrop from './CreateNFTDrop';
import CreateTokenDrop from './CreateTokenDrop';
import ListTokenDrop from './ListTokenDrop';

const Linkdrops = ({ drops, reload }: { drops: Drops[]; reload: (delay: number) => void }) => {
  const [selector, setSelector] = useState(false);

  return (
    <>
      <Text size="text-l" style={{ marginBottom: '12px' }}>
        Create a LinkDrop
      </Text>
      <Flex as="label" align="center">
        Token
        <Switch
          onCheckedChange={() => setSelector(!selector)}
          iconOn={<ImageSquare weight="bold" />}
          iconOff={<Coins weight="bold" />}
        />
        NFT
      </Flex>
      {!selector && <CreateTokenDrop reload={reload} />}
      {selector && <CreateNFTDrop reload={reload} />}
      <ListTokenDrop drops={drops} />
    </>
  );
};

export default Linkdrops;
