import { Accordion, Flex, Text } from '@near-pagoda/ui';
import Image from 'next/image';

import type { FT } from '@/pages/tools';

const ListToken = ({ tokens }: { tokens: FT[] }) => {
  return (
    <Accordion.Root type="multiple">
      <Accordion.Item value="one">
        <Accordion.Trigger>Tokens you minted</Accordion.Trigger>
        <Accordion.Content>
          {tokens.map((token) => {
            return (
              <Flex justify="space-between" align="center" key={`ft-${token.symbol}`}>
                <Text>{token.name}</Text>
                <Text>{token.symbol}</Text>
                <Text>{BigInt(token.total_supply) / BigInt(Math.pow(10, Number(token.decimals)))}</Text>
                <Image src={token.icon} alt={token.name} width={50} height={50} />
              </Flex>
            );
          })}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default ListToken;
