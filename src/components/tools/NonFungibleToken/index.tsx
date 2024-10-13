import type { NFT } from '@/utils/types';

import CommunityTools from './CommunityTools';
import ListToken from './ListToken';
import MintNft from './MintNft';

const NonFungibleToken = ({
  user_collections: tokens,
  reload,
}: {
  user_collections: { [key: string]: NFT[] }[];
  reload: (delay: number) => void;
}) => {
  return (
    <>
      <MintNft reload={reload} />
      <ListToken collections={tokens} />
      <hr />
      <CommunityTools />
    </>
  );
};

export default NonFungibleToken;
