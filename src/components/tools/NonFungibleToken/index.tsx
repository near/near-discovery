import type { NFT } from '@/utils/types';

import CommunityTools from './CommunityTools';
import ListToken from './ListToken';
import MintNft from './MintNft';

const NonFungibleToken = ({
  user_collections,
  loading,
  reload,
}: {
  user_collections: { [key: string]: NFT[] }[];
  loading: boolean;
  reload: (delay: number) => void;
}) => {
  return (
    <>
      <MintNft reload={reload} />
      <ListToken loading={loading} collections={user_collections} />
      <hr />
      <CommunityTools />
    </>
  );
};

export default NonFungibleToken;
