import { Accordion, Table, Text, Tooltip } from '@near-pagoda/ui';
import { CircleWavyCheck, CircleWavyWarning } from '@phosphor-icons/react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import TokenDefault from '@/assets/images/token_default.svg';
import { NearContext } from '@/components/wallet-selector/WalletSelector';
import type { FT } from '@/utils/types';

const Untrusted = ({ contract_id }: { contract_id: string }) => {
  const [clicks, setClicks] = useState(0);
  const { wallet } = useContext(NearContext);
  const count = () => {
    setClicks(clicks + 1);
  };

  useEffect(() => {
    if (clicks === 5)
      wallet?.callMethod({
        contractId: contract_id,
        method: 'storage_unregister',
        args: { force: true },
        deposit: '1',
      });
  }, [clicks, contract_id, wallet]);

  return <CircleWavyWarning onClick={count} color={'var(--red11)'} style={{ minWidth: '1rem' }} />;
};

const ListToken = ({ tokens, loading }: { tokens: FT[]; loading: boolean }) => {
  // skip first (NEAR Token)
  const display = tokens.slice(1);

  if (loading) return <Text> Loading your tokens... </Text>;

  return (
    <Accordion.Root type="multiple" style={{ borderRadius: '6px', boxShadow: '0 0 0 2px var(--violet5)' }}>
      <Accordion.Item value="tokens">
        <Accordion.Trigger>Your Fungible Tokens</Accordion.Trigger>
        <Accordion.Content>
          {display.length === 0 ? (
            <Text> You have no tokens </Text>
          ) : (
            <Table.Root>
              <Table.Body>
                {display.map((token) => {
                  return (
                    <Table.Row key={token.contract_id}>
                      <Table.Cell>
                        <Image
                          src={token.metadata.icon || TokenDefault}
                          alt={token.metadata.name}
                          width={25}
                          height={0}
                          style={{ minWidth: '25px', height: 'auto' }}
                        />
                      </Table.Cell>

                      <Table.Cell>
                        {' '}
                        <Text clampLines={1}>
                          {token.metadata.symbol} ({token.contract_id}){' '}
                        </Text>
                      </Table.Cell>
                      <Table.Cell align="right">
                        {' '}
                        {(Number(token.balance) / Number(Math.pow(10, Number(token.metadata.decimals)))).toFixed(
                          2,
                        )}{' '}
                      </Table.Cell>
                      <Table.Cell>
                        {' '}
                        {token.verified ? (
                          <Tooltip content="Trusted">
                            <span>
                              <CircleWavyCheck color="#7c3aed" style={{ minWidth: '1rem' }} />
                            </span>
                          </Tooltip>
                        ) : (
                          <Tooltip content="Not Trusted">
                            <span>
                              <Untrusted contract_id={token.contract_id} />
                            </span>
                          </Tooltip>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Root>
          )}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default ListToken;
