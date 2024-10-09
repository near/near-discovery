import type { FT } from '@/pages/tools';

import CreateTokenForm from './CreateTokenForm';
import ListToken from './ListToken';

const FungibleToken = ({ tokens }: { tokens: FT[] }) => {
  return (
    <>
      <CreateTokenForm />
      {tokens.length != 0 && (
        <>
          <hr />
          <ListToken tokens={tokens} />
        </>
      )}
    </>
  );
};
export default FungibleToken;
