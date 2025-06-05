import { Button, copyTextToClipboard, Flex, Text, Tooltip } from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { Copy } from '@phosphor-icons/react';

export const ReceiveNear = () => {
  const { signedAccountId } = useWalletSelector();

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
