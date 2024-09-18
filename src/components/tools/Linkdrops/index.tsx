import { Flex, Switch } from '@near-pagoda/ui';
import { Coins, ImageSquare } from '@phosphor-icons/react';
import { useState } from 'react';

import type { Drops } from '@/utils/types';

import CreateNFTDrop from './CreateNFTDrop';
import CreateTokenDrop from './CreateTokenDrop';
import ListTokenDrop from './ListTokenDrop';

const Linkdrops = ({ drops }: { drops: Drops[] }) => {
  const [selector, setSelector] = useState(false);

  return (
    <>
      <Flex as="label" align="center">
        Token
        <Switch
          onCheckedChange={() => setSelector(!selector)}
          iconOn={<ImageSquare weight="bold" />}
          iconOff={<Coins weight="bold" />}
        />
        NFT
      </Flex>
      {!selector && <CreateTokenDrop />}
      {selector && <CreateNFTDrop />}
      <ListTokenDrop drops={drops} />
    </>
  );
};

export default Linkdrops;
