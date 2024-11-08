import { Button, copyTextToClipboard, Flex, Text, Tooltip } from '@near-pagoda/ui';
import { Copy } from '@phosphor-icons/react';
import { useContext } from 'react';

import { NearContext } from '../wallet-selector/WalletSelector';

export const ReceiveNear = () => {
  const { signedAccountId } = useContext(NearContext);

  if (!signedAccountId) return <Text> Sign in to see your NEAR account name </Text>;

  return (
    <Flex stack>
      <Text size="text-s">Copy and share your account ID to receive NEAR:</Text>

      <Flex align="center">
        <Text style={{ marginRight: 'auto' }} weight={600} color="sand12">
          {signedAccountId}
        </Text>

        <Tooltip content="Copy Account ID">
          <Button
            label="Copy Account ID"
            icon={<Copy />}
            size="small"
            fill="outline"
            onClick={() => copyTextToClipboard(signedAccountId, signedAccountId)}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
