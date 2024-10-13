import { Accordion, Text } from '@near-pagoda/ui';

import type { NFT } from '@/utils/types';

import Carousel from '../Shared/Carousel';

const ListToken = ({ collections }: { collections: any[] }) => {
  return (
    <Accordion.Root type="multiple" style={{ borderRadius: '6px', boxShadow: '0 0 0 2px var(--violet5)' }}>
      <Accordion.Item value="one">
        <Accordion.Trigger>Your Non-Fungibles Tokens</Accordion.Trigger>
        <Accordion.Content>
          {collections.map((collection) =>
            Object.entries(collection).map(([name, nfts]) => (
              <>
                <Carousel nfts={nfts as NFT[]} />
                <Text size="text-s">{name}</Text>
              </>
            )),
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default ListToken;
