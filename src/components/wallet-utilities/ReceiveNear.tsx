import { Button, copyTextToClipboard, Flex, Text, Tooltip } from '@near-pagoda/ui';
import { Copy } from '@phosphor-icons/react';

import { useAuthStore } from '@/stores/auth';

export const ReceiveNear = () => {
  const accountId = useAuthStore((store) => store.accountId);

  return (
    <Flex stack>
      <Text size="text-s">Copy and share your account ID to receive NEAR:</Text>

      <Flex align="center">
        <Text style={{ marginRight: 'auto' }} weight={600} color="sand12">
          {accountId}
        </Text>

        <Tooltip content="Copy Account ID">
          <Button
            label="Copy Account ID"
            icon={<Copy />}
            size="small"
            fill="outline"
            onClick={() => copyTextToClipboard(accountId, accountId)}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
