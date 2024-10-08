import { Button, Table, Text, Tooltip } from '@near-pagoda/ui';
import type { DeleteKeyAction } from '@near-wallet-selector/core';
import { useContext, useEffect, useState } from 'react';

import { NearContext } from '../wallet-selector/WalletSelector';

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
  const { signedAccountId, wallet } = useContext(NearContext);

  const [keys, setKeys] = useState<AccessKey[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!wallet?.selector || !signedAccountId) return;

    const getInfo = async () => {
      const accessKeys: AccessKey[] = await wallet.getAccessKeys(signedAccountId);
      setKeys(accessKeys.filter((accessKey) => accessKey.access_key.permission.FunctionCall));
    };

    getInfo();
  }, [wallet, wallet?.selector, signedAccountId]);

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
    if (!signedAccountId || !wallet) return;

    const actions: DeleteKeyAction[] = selectedKeys.map((publicKey) => {
      return {
        type: 'DeleteKey',
        params: {
          publicKey: publicKey,
        },
      };
    });

    await wallet.signAndSendTransactions({ transactions: [{ receiverId: signedAccountId, actions }] as any });
  };

  return (
    <>
      <Text size="text-s">Function call keys created by applications:</Text>
      <Button label="Deauthorize" onClick={handleDeauthorizeAll} disabled={selectedKeys.length === 0} />
      <Table.Root style={{ width: '100%' }}>
        <Table.Head sticky={false}>
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
              <Table.Cell>
                <Tooltip content={data.access_key.permission.FunctionCall?.receiver_id ?? 'N/A'}>
                  <Text style={{ minWidth: '5rem', whiteSpace: 'pre-wrap' }} clampLines={1}>
                    {data.access_key.permission.FunctionCall?.receiver_id ?? 'N/A'}
                  </Text>
                </Tooltip>
              </Table.Cell>
              <Table.Cell>
                <Tooltip content={data.public_key}>
                  <Text style={{ minWidth: '5rem', whiteSpace: 'pre-wrap' }} clampLines={1}>
                    {data.public_key}
                  </Text>
                </Tooltip>
              </Table.Cell>
              <Table.Cell>
                {(parseFloat(data.access_key.permission.FunctionCall?.allowance ?? '0') / 1e24).toFixed(2)} NEAR
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default KeyTable;
