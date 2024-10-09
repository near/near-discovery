import type { NFT } from '@/pages/tools';

import CommunityTools from './CommunityTools';
import ListToken from './ListToken';
import MintNft from './MintNft';

const NonFungibleToken = ({ tokens }: { tokens: NFT[] }) => {
  return (
    <>
      <MintNft />
      {tokens.length != 0 && (
        <>
          <hr />
          <ListToken tokens={tokens} />
          <hr />
        </>
      )}
      <CommunityTools />
    </>
  );
};

export default NonFungibleToken;
