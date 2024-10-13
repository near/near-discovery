import type { NFT } from '@/utils/types';

import CommunityTools from './CommunityTools';
import ListToken from './ListToken';
import MintNft from './MintNft';

const NonFungibleToken = ({ tokens, reload }: { tokens: NFT[]; reload: (delay: number) => void }) => {
  return (
    <>
      <MintNft reload={reload} />
      <hr />
      <ListToken collections={tokens} />
      <hr />
      <CommunityTools />
    </>
  );
};

export default NonFungibleToken;
