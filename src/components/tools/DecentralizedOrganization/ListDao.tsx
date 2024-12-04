import { Accordion, Table, Text } from '@near-pagoda/ui';
import { ArrowSquareOut } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';

import type { DAO } from '@/utils/types';

type Props = {
  loading: boolean;
  daos: DAO[];
};

const ListDao = ({ daos, loading }: Props) => {
  return (
    <Accordion.Root type="multiple" style={{ borderRadius: '6px', boxShadow: '0 0 0 2px var(--violet5)' }}>
      <Accordion.Item value="tokens">
        <Accordion.Trigger>All Your Decentralized Organizations</Accordion.Trigger>
        <Accordion.Content>
          {loading ? (
            <Text> Loading your DAOs... </Text>
          ) : daos.length === 0 ? (
            <Text> You have no DAOs </Text>
          ) : (
            <Table.Root>
              <Table.Head sticky={false}>
                <Table.Cell>Logo</Table.Cell>
                <Table.Cell>Contract</Table.Cell>
                <Table.Cell>Title</Table.Cell>
                <Table.Cell>Description</Table.Cell>
                <Table.Cell>Manage</Table.Cell>
              </Table.Head>
              <Table.Body>
                {daos.map((dao) => {
                  return (
                    <Table.Row key={dao.contract_id}>
                      <Table.Cell>
                        {dao.metadata.logo_data && (
                          <Image
                            src={dao.metadata.logo_data}
                            alt={dao.public_name}
                            width={25}
                            height={0}
                            style={{ minWidth: '25px', height: 'auto' }}
                          />
                        )}
                      </Table.Cell>

                      <Table.Cell>
                        <Text clampLines={1}>{dao.contract_id}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text clampLines={1}>{dao.public_name}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text clampLines={1}>{dao.description.substring(0, 48)}</Text>
                      </Table.Cell>

                      <Table.Cell align="center">
                        <Link
                          href={`/astraplusplus.ndctools.near/widget/home?page=dao&daoId=${dao.contract_id}`}
                          target="_blank"
                        >
                          <ArrowSquareOut color="#7c3aed" style={{ minWidth: '1rem' }} />
                        </Link>
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

export default ListDao;
