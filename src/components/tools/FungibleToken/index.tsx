import type { FT } from '@/pages/tools';

import CreateTokenForm from './CreateTokenForm';
import ListToken from './ListToken';
import CommunityTools from './CommunityTools';

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
