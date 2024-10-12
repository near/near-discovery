import { Button, Text } from '@near-pagoda/ui';

import type { FT } from '@/utils/types';

import CreateTokenForm from './CreateTokenForm';
import ListToken from './ListToken';

const FungibleToken = ({ tokens, reload }: { tokens: FT[]; reload: (delay: number) => void }) => {
  return (
    <>
      <CreateTokenForm reload={reload} />
      <ListToken tokens={tokens} />
      <hr />
      <Text>For more advanced options please use tools created by the community:</Text>
      <Button label="Token Homes" href="https://tkn.homes/" target="_blank" />
    </>
  );
};
export default FungibleToken;
