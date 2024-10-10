import type { FT } from '@/pages/tools';

import CommunityTools from './CommunityTools';
import CreateTokenForm from './CreateTokenForm';
import ListToken from './ListToken';

const FungibleToken = ({ tokens, reload }: { tokens: FT[]; reload: (delay: number) => void }) => {
  return (
    <>
      <CreateTokenForm reload={reload} />
      <hr />
      <ListToken tokens={tokens} />
      <hr />
      <CommunityTools />
    </>
  );
};
export default FungibleToken;
