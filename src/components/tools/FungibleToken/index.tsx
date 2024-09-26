import type { FT } from '@/pages/tools';

import CommunityTools from './CommunityTools';
import CreateTokenForm from './CreateTokenForm';
import ListToken from './ListToken';

const FungibleToken = ({ tokens }: { tokens: FT[] }) => {
  return (
    <>
      <CreateTokenForm />
      <hr />
      <ListToken tokens={tokens} />
      <hr />
      <CommunityTools />
    </>
  );
};
export default FungibleToken;
