import { Accordion, Flex, Text } from '@near-pagoda/ui';
import Image from 'next/image';

import TokenDefault from '@/assets/images/token_default.svg';
import type { FT } from '@/utils/types';

const ListToken = ({ tokens }: { tokens: FT[] }) => {
  // skip first
  const display = tokens.slice(1);

  return (
    <Accordion.Root type="multiple" style={{ borderRadius: '6px', boxShadow: '0 0 0 2px var(--violet5)' }}>
      <Accordion.Item value="tokens">
        <Accordion.Trigger>Your Fungible Tokens</Accordion.Trigger>
        <Accordion.Content>
          {display.map((token) => {
            return (
              <Flex justify="space-between" align="center" key={`ft-${token.metadata.symbol}`}>
                <Text>{token.metadata.name}</Text>
                <Text>{token.metadata.symbol}</Text>
                <Text>
                  {(BigInt(token.balance) / BigInt(Math.pow(10, Number(token.metadata.decimals)))).toString()}
                </Text>
                <Image src={token.metadata.icon || TokenDefault} alt={token.metadata.name} width={50} height={50} />
              </Flex>
            );
          })}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default ListToken;
