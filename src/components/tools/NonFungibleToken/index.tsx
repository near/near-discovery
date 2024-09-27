import CommunityTools from './CommunityTools';
import ListToken from './ListToken';
import MintNft from './MintNft';

interface NFT {
  token_id: string;
  title: string;
  media?: string;
  contract_id: string;
}

const NonFungibleToken = ({ tokens }: { tokens: NFT[] }) => {
  console.log('tokens', tokens);
  
  return (
    <>
      <MintNft />
      <hr />
      <ListToken tokens={tokens} />
      <hr />
      <CommunityTools />
    </>
  );
};

export default NonFungibleToken;
