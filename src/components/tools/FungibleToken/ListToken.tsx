import { Accordion, Table, Text, Tooltip } from '@near-pagoda/ui';
import { CircleWavyCheck, CircleWavyQuestion } from '@phosphor-icons/react';
import Image from 'next/image';

import TokenDefault from '@/assets/images/token_default.svg';
import type { FT } from '@/utils/types';

const ListToken = ({ tokens, loading }: { tokens: FT[]; loading: boolean }) => {
  // skip first (NEAR Token)
  const display = tokens.slice(1);

  if (loading) return <Text> Loading your tokens... </Text>;

  return (
    <Accordion.Root type="multiple" style={{ borderRadius: '6px', boxShadow: '0 0 0 2px var(--violet5)' }}>
      <Accordion.Item value="tokens">
        <Accordion.Trigger>All Your Fungible Tokens</Accordion.Trigger>
        <Accordion.Content>
          {display.length === 0 ? (
            <Text> You have no tokens </Text>
          ) : (
            <Table.Root>
              <Table.Head sticky={false}>
                <Table.Cell>Icon</Table.Cell>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>Contract</Table.Cell>
                <Table.Cell align="right">Balance</Table.Cell>
                <Table.Cell>
                  <CircleWavyCheck color="#7c3aed" />
                </Table.Cell>
              </Table.Head>
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
                        <Text clampLines={1}>{token.metadata.symbol}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text clampLines={1}>{token.contract_id}</Text>
                      </Table.Cell>
                      <Table.Cell align="right">
                        {(Number(token.balance) / Number(Math.pow(10, Number(token.metadata.decimals)))).toFixed(2)}
                      </Table.Cell>
                      <Table.Cell>
                        {token.verified ? (
                          <Tooltip content="Verified Token">
                            <span>
                              <CircleWavyCheck color="#7c3aed" style={{ minWidth: '1rem' }} />
                            </span>
                          </Tooltip>
                        ) : (
                          <Tooltip content="Unverified Token">
                            <span>
                              <CircleWavyQuestion style={{ minWidth: '1rem' }} />
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
