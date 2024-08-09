import { Button, Table, Text, Tooltip } from '@near-pagoda/ui';
import type { DeleteKeyAction } from '@near-wallet-selector/core';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';

type AccessKey = {
  public_key: string;
  access_key: {
    permission: {
      FunctionCall?: {
        receiver_id: string;
        allowance?: string;
      };
    };
  };
};

const KeyTable: React.FC = () => {
  const near = useVmStore((store) => store.near);
  const accountId = useAuthStore((store) => store.accountId);
  const wallet = useAuthStore((store) => store.wallet);

  const [keys, setKeys] = useState<AccessKey[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!near || !accountId) return;

    const getInfo = async () => {
      const { nearConnection } = near;
      const account = await nearConnection.account(accountId);
      const accessKeys = (await account.getAccessKeys()) as AccessKey[];
      setKeys(accessKeys.filter((accessKey) => accessKey.access_key.permission.FunctionCall));
    };

    getInfo();
  }, [near, accountId]);

  const truncatePublicKey = (key: string): string => `${key.slice(0, 20)}...`;

  const handleSelectAll = (): void => {
    if (selectedKeys.length === keys.length) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(keys.map((key) => key.public_key));
    }
  };

  const handleSelect = (id: string): void => {
    setSelectedKeys((prev) => (prev.includes(id) ? prev.filter((keyId) => keyId !== id) : [...prev, id]));
  };

  const handleDeauthorizeAll = async (): Promise<void> => {
    if (!accountId || !wallet) return;

    const actions: DeleteKeyAction[] = selectedKeys.map((publicKey) => {
      return {
        type: 'DeleteKey',
        params: {
          publicKey: publicKey,
        },
      };
    });

    await wallet.signAndSendTransaction({ receiverId: accountId, actions });
  };

  return (
    <>
      <Button label="Deauthorize" onClick={handleDeauthorizeAll} disabled={selectedKeys.length === 0} />
      <Table.Root style={{ width: '100%' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <input type="checkbox" onChange={handleSelectAll} checked={selectedKeys.length === keys.length} />
            </Table.HeaderCell>
            <Table.HeaderCell>Receiver ID</Table.HeaderCell>
            <Table.HeaderCell>Keys</Table.HeaderCell>
            <Table.HeaderCell>Fee Allowance</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {keys.map((data) => (
            <Table.Row key={data.public_key}>
              <Table.Cell>
                <input
                  type="checkbox"
                  onChange={() => handleSelect(data.public_key)}
                  checked={selectedKeys.includes(data.public_key)}
                />
              </Table.Cell>
              <Table.Cell>{data.access_key.permission.FunctionCall?.receiver_id ?? 'N/A'}</Table.Cell>
              <Table.Cell>
                <Tooltip content={data.public_key}>
                  <Text>{truncatePublicKey(data.public_key)}</Text>
                </Tooltip>
              </Table.Cell>
              <Table.Cell>
                {parseFloat(data.access_key.permission.FunctionCall?.allowance ?? '0') / 1e24} NEAR
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default KeyTable;
