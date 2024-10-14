import { Accordion, Text } from '@near-pagoda/ui';

import type { NFT } from '@/utils/types';

import Carousel from '../Shared/Carousel';

type Collection = {
  [key: string]: NFT[];
};

const ListToken = ({ loading, collections }: { loading: boolean; collections: Collection[] }) => {
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Accordion.Root type="multiple" style={{ borderRadius: '6px', boxShadow: '0 0 0 2px var(--violet5)' }}>
      <Accordion.Item value="one">
        <Accordion.Trigger>All Your Non-Fungibles Tokens</Accordion.Trigger>
        <Accordion.Content>
          {collections.length === 0 && <Text> You have no tokens </Text>}
          {collections.map((collection) =>
            Object.entries(collection).map(([name, nfts]) => (
              <>
                <Carousel nfts={nfts} />
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
