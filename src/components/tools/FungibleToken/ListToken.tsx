import { Accordion, Flex, Text } from "@near-pagoda/ui";
import Image from "next/image";

const ListToken = ({ tokens }) => {
  
  return (
    <Accordion.Root type="multiple">
    <Accordion.Item value="one">
        <Accordion.Trigger>Tokens you minted</Accordion.Trigger>
        <Accordion.Content>
        {tokens.map((token) => {
          return (
            <Flex justify="space-between" align="center">
              <Text>{token.name}</Text>
              <Text>{token.symbol}</Text>
              <Text>{token.total_supply/ 10 ** token.decimals}</Text>
              <Image src={token.icon} alt={token.name} width={50} height={50}/>
            </Flex>
          );
        })}
        </Accordion.Content>
    </Accordion.Item>
    </Accordion.Root>
  );
};

export default ListToken;